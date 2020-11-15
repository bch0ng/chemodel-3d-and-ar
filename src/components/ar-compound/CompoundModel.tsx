import * as React from 'react';
import { ViroMaterials, ViroPolyline } from 'react-viro';
import * as atoms from 'assets/atoms.json';
import { Atom, CompoundData, Coordinates } from '@types';
import { AtomModel } from './AtomModel';
import { BondModel } from './BondModel';
import { NORMALIZER } from '../../constants';

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

    function calculateAtomScale(mass: number): number {
        return mass < 10 ? Math.log(mass + 1) : Math.log10(mass + 1);
    }

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
            const scaledSize = calculateAtomScale(atom.mass);
            a.push(
                <AtomModel
                    key={`atom_${i}_${elementNum}`}
                    name={atom.name.toLowerCase()}
                    position={[
                        coords.x / NORMALIZER,
                        coords.y / NORMALIZER,
                        coords.z / NORMALIZER - 0.25
                    ]}
                    scale={[scaledSize, scaledSize, scaledSize]}
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
            const key = `bond_${i}_${compound.aids[i].from}_${compound.aids[i].to}`;
            const isDoubleBond = compound.numOfBonds[i] === 2;
            const aids = compound.aids;
            const fromCoords: Coordinates = compound.coords[aids[i].from - 1];
            const toCoords: Coordinates = compound.coords[aids[i].to - 1];
            if (isDoubleBond) {
                b.push(
                    <BondModel
                        key={`${key}_1`}
                        from={fromCoords}
                        to={toCoords}
                    />
                );
            }
            b.push(
                <BondModel
                    key={`${key}_${isDoubleBond ? '2' : ''}`}
                    from={fromCoords}
                    to={toCoords}
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
