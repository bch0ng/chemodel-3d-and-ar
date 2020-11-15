import * as React from 'react';
import { useDebounce } from '../hooks/useDebounce';
import {
    CompoundInfo,
    CompoundData,
    Coordinates,
    Aids,
    FormulaAndWeight
} from '@types';

interface SearchContextValue {
    query: string;
    updateQuery: (newQuery: string) => void;
    error?: string;
    suggestions: string[];
    selectSuggestion: (suggestion: string) => void;
    isLoading: boolean;
    compound: any;
    onQuerySubmit: (manualQuery?: string) => Promise<void>;
}

const initialState: SearchContextValue = {
    query: '',
    updateQuery: () => {},
    suggestions: [],
    selectSuggestion: () => {},
    isLoading: false,
    compound: {},
    onQuerySubmit: async () => {}
};

export const SearchContext = React.createContext<SearchContextValue>(
    initialState
);

export function useSearchContext(): SearchContextValue {
    return React.useContext(SearchContext);
}

export function useCreateSearchContext(): SearchContextValue {
    const [query, setQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [compound, setCompound] = React.useState<CompoundInfo | null>(null);

    const debouncedQuery = useDebounce({ value: query, delay: 500 });

    async function fetchSuggestions(): Promise<void> {
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${debouncedQuery}/json?limit=5`;
        try {
            const res = await fetch(url);
            const resJSON = await res.json();
            if (
                resJSON.total > 0 &&
                resJSON.dictionary_terms &&
                resJSON.dictionary_terms.compound
            ) {
                setSuggestions(resJSON.dictionary_terms.compound);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            setSuggestions([]);
            console.log(err);
        }
    }

    // Get search suggestions
    React.useEffect((): void => {
        // Reset error
        setError(undefined);
        if (debouncedQuery) {
            fetchSuggestions();
        }
    }, [debouncedQuery]);

    React.useEffect((): void => {
        if (!query) {
            setSuggestions([]);
        }
    }, [query]);

    // Gets the compound ID. We must get the CID before requesting any
    // additional data. This also helps us check if the query is a valid
    // compound name.
    async function requestCompoundID(
        query: string
    ): Promise<number | undefined> {
        try {
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/record/JSON/`;
            let res = await fetch(url);
            let resJSON = await res.json();
            if (!resJSON.Fault && resJSON.PC_Compounds?.[0]?.id?.id) {
                return resJSON.PC_Compounds[0].id.id.cid;
            }
        } catch (err) {
            console.log(err);
        }
        return undefined;
    }

    async function requestCompoundName(
        cid: number
    ): Promise<string | undefined> {
        try {
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`;
            const res = await fetch(url);
            const resJSON = await res.json();
            if (resJSON.InformationList?.Information?.[0]) {
                return resJSON.InformationList.Information[0].Title;
            }
        } catch (err) {
            console.log(err);
        }
        return undefined;
    }

    async function requestCompoundFormulaAndWeight(
        cid: number
    ): Promise<FormulaAndWeight | undefined> {
        try {
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularFormula,MolecularWeight/JSON/`;
            const res = await fetch(url);
            const resJSON = await res.json();
            const properties = resJSON.PropertyTable?.Properties?.[0];
            return {
                formula: properties.MolecularFormula,
                weight: properties.MolecularWeight
            };
        } catch (err) {
            console.log(err);
        }
        return undefined;
    }

    async function requestCompoundData(
        cid: number
    ): Promise<CompoundData | undefined> {
        try {
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON/?record_type=3d&response_type=display`;
            const res = await fetch(url);
            const resJSON = await res.json();
            const compound = resJSON.PC_Compounds?.[0];
            if (compound) {
                const { x, y, z } = compound.coords?.[0]?.conformers[0];
                if (!x || !y || !z) {
                    return undefined;
                }
                const coords: Coordinates[] = [];
                for (const [idx, val] of x.entries()) {
                    coords.push({
                        x: val,
                        y: y[idx],
                        z: z[idx]
                    });
                }

                const bonds = compound.bonds;
                const aids: Aids[] = [];
                for (const [idx, val] of bonds.aid1.entries()) {
                    aids.push({
                        from: val,
                        to: bonds.aid2[idx]
                    });
                }

                return {
                    coords,
                    aids,
                    numOfBonds: bonds.order,
                    elements: compound.atoms.element,
                    has3DModel: true
                };
            }
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    function requestModel2DImageURL(cid: number): string {
        return `https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=${cid}&width=300&height=300`;
    }

    // Fetches all information needed about a compound.
    // A manualQuery can be used for search suggestions to bypass the
    // wait for the query state to update.
    // TODO(brandon): Make this cleaner by removing this manualQuery param.
    async function requestCompound(manualQuery?: string): Promise<void> {
        setIsLoading(true);
        // We use query and not debouncedQuery here because the
        // debouncedQuery might be slightly outdated.
        const cid: number | undefined = await requestCompoundID(
            manualQuery || query
        );
        if (cid === undefined) {
            setCompound(null);
        } else {
            const [
                name,
                data,
                formulaAndWeight,
                model2DImageURL
            ] = await Promise.all([
                requestCompoundName(cid),
                requestCompoundData(cid),
                requestCompoundFormulaAndWeight(cid),
                requestModel2DImageURL(cid)
            ]);

            const compoundInfo: CompoundInfo = {
                cid,
                name,
                data,
                imageURL: model2DImageURL
            };
            if (formulaAndWeight) {
                compoundInfo.formula = formulaAndWeight.formula;
                compoundInfo.weight = formulaAndWeight.weight;
            }
            setCompound(compoundInfo);
        }
        setIsLoading(false);
    }

    function selectSuggestion(suggestion: string): void {
        // Setting the query to '' will clear the suggestions
        setQuery('');
        requestCompound(suggestion);
    }

    return {
        query,
        updateQuery: (newQuery: string): void => setQuery(newQuery),
        error,
        suggestions,
        selectSuggestion,
        isLoading,
        compound,
        onQuerySubmit: requestCompound
    };
}
