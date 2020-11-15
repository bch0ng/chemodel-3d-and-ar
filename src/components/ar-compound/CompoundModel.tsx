import * as React from 'react';
import { ViroMaterials, ViroPolyline } from 'react-viro';
import * as atoms from 'assets/atoms.json';
import { Atom, CompoundData, Coordinates } from '@types';
import { AtomModel } from './AtomModel';

const NORMALIZER = 15;
const BOND_THICKNESS = 0.005;
const DOUBLE_BOND_OFFSET = 0.005;

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
    // Add bond material
    materials.bond = {
        roughness: 0.0,
        metalness: 0.3,
        diffuseColor: '#fff',
        lightingModel: 'PBR'
    };
    ViroMaterials.createMaterials(materials);
}

interface CompoundModelProps {
    compound: CompoundData;
    setClickedAtom: (atom: Atom) => void;
}
export function CompoundModel(props: CompoundModelProps): JSX.Element {
    const { compound, setClickedAtom } = props;

    const [models, setModels] = React.useState<JSX.Element[]>([]);
    const [materialsLoaded, setMaterialsLoaded] = React.useState(false);

    React.useEffect((): void => {
        if (compound && compound.elements) {
            createMaterials(compound.elements);
            setMaterialsLoaded(true);
        }
    }, [compound]);

    async function generateAtomModels(): Promise<JSX.Element[]> {
        const a: JSX.Element[] = [];
        for (let i = 0; i < compound.elements.length; i++) {
            const elementNum: number = compound.elements[i];
            const coords: Coordinates = compound.coords[i];

            // @ts-ignore
            const atomJSON = atoms[elementNum.toString(10)];
            const atom = {
                id: elementNum,
                symbol: atomJSON.symbol,
                name: atomJSON.name,
                category: atomJSON.category,
                mass: atomJSON.mass,
                color: atomJSON.hexColor
            };
            a.push(
                <AtomModel
                    key={`atom_${i}_${elementNum}`}
                    name={atom.name.toLowerCase()}
                    position={[
                        coords.x / NORMALIZER,
                        coords.y / NORMALIZER,
                        coords.z / NORMALIZER - 0.25
                    ]}
                    onClick={(): void => {
                        console.log('Clicked');
                        setClickedAtom(atom);
                    }}
                />
            );
        }
        return a;
    }

    async function generateBondModels(): Promise<JSX.Element[]> {
        const b = [];
        for (let i = 0; i < compound.aids.length; i++) {
            const fromCoords: Coordinates =
                compound.coords[compound.aids[i].from - 1];
            const toCoords: Coordinates =
                compound.coords[compound.aids[i].to - 1];

            let doubleBondOffset = 0;
            if (compound.numOfBonds[i] === 2) {
                doubleBondOffset = DOUBLE_BOND_OFFSET;
                b.push(
                    <ViroPolyline
                        key={`bond_${i}_${compound.aids[i].from}_${compound.aids[i].to}_1`}
                        position={[0, 0, 0]}
                        points={[
                            [
                                fromCoords.x / NORMALIZER - doubleBondOffset,
                                fromCoords.y / NORMALIZER - doubleBondOffset,
                                fromCoords.z / NORMALIZER - 0.25
                            ],
                            [
                                toCoords.x / NORMALIZER - doubleBondOffset,
                                toCoords.y / NORMALIZER - doubleBondOffset,
                                toCoords.z / NORMALIZER - 0.25
                            ]
                        ]}
                        thickness={BOND_THICKNESS}
                        materials={'bond'}
                    />
                );
            }

            b.push(
                <ViroPolyline
                    key={`bond_${i}_${compound.aids[i].from}_${
                        compound.aids[i].to
                    }_${doubleBondOffset > 0 ? '2' : ''}`}
                    position={[0, 0, 0]}
                    points={[
                        [
                            fromCoords.x / NORMALIZER + doubleBondOffset,
                            fromCoords.y / NORMALIZER + doubleBondOffset,
                            fromCoords.z / NORMALIZER - 0.25
                        ],
                        [
                            toCoords.x / NORMALIZER + doubleBondOffset,
                            toCoords.y / NORMALIZER + doubleBondOffset,
                            toCoords.z / NORMALIZER - 0.25
                        ]
                    ]}
                    thickness={BOND_THICKNESS}
                    materials={'bond'}
                    ignoreEventHandling={true}
                />
            );
        }
        return b;
    }

    async function generateModels(): Promise<void> {
        const [atomModels, bondModels] = await Promise.all([
            generateAtomModels(),
            generateBondModels()
        ]);
        setModels([...bondModels, ...atomModels]);
    }

    React.useEffect((): void => {
        if (materialsLoaded) {
            generateModels();
        }
    }, [materialsLoaded]);

    return <>{materialsLoaded && models}</>;
}
