import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface SearchSuggestionsProps {
    query: string;
}
export function SearchSuggestions(props: SearchSuggestionsProps): JSX.Element {
    const { query } = props;
    const searchSuggestions: string[] = React.useMemo(async (): string[] => {
        let url = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${query}/json?limit=5`;
        try {
            let response = await fetch(url);
            let responseJSON = await response.json();
            if (responseJSON.total > 0) {
                return responseJSON.dictionary_terms.compound;
            } else {
                return [];
            }
        } catch {
            return [];
        }
    }, [query]);

    return (
        <View>
            <TouchableOpacity
                key={elem}
                onPress={() => this.autoCompletePressed(elem)}
                style={{
                    padding: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                    marginRight: 10
                }}
            >
                <Text
                    style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}
                >
                    {elem}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
