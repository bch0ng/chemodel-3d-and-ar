import * as React from 'react';
import { ViroMaterials } from 'react-viro';
import * as atoms from 'assets/atoms.json';
import { Atom } from '@local-types';
import { AtomModel } from './AtomModel';

interface Material {
    roughness?: number;
    metalness?: number;
    diffuseColor: string;
    lightingModel?: string;
}
function createMaterials(atomNums: number[]): void {
    const materials: Record<string, Material> = {};
    for (const atomNum of atomNums) {
        // @ts-ignore
        // Due to the structure of the JSON being like a map,
        // we ignore this TypeScript warning/error.
        const atom = atoms[atomNum.toString(10)];
        if (!(atom.name.toLowerCase() in materials)) {
            materials[atom.name.toLowerCase()] = {
                roughness: 0.0,
                metalness: 0.3,
                diffuseColor: `#${atom.hexColor}`,
                lightingModel: 'PBR'
            };
        }
    }
    ViroMaterials.createMaterials(materials);
}

interface CompoundModelProps {
    setClickedAtom: (atom: Atom) => void;
}
export function CompoundModel(props: CompoundModelProps): JSX.Element {
    const { setClickedAtom } = props;
    const atomNums = [1, 1, 8];

    React.useEffect((): void => {
        createMaterials(atomNums);
    }, []);

    return (
        <>
            {atomNums.map(
                (atomNum, idx): JSX.Element => {
                    // @ts-ignore
                    const atomJSON = atoms[atomNum.toString(10)];
                    const atom = {
                        id: atomNum,
                        symbol: atomJSON.symbol,
                        name: atomJSON.name,
                        category: atomJSON.category,
                        mass: atomJSON.mass,
                        color: atomJSON.hexColor
                    };
                    return (
                        <AtomModel
                            key={`atom_${idx}_${atomNum}`}
                            idx={idx}
                            name={atom.name.toLowerCase()}
                            onClick={(): void => {
                                setClickedAtom(atom);
                            }}
                        />
                    );
                }
            )}
        </>
    );
}
