import * as React from 'react';
import {
    ViroARScene,
    ViroText,
    ViroSphere,
    ViroConstants,
    ViroARSceneNavigator,
    ViroMaterials,
    ViroAmbientLight,
    ViroOrbitCamera,
    ViroSpotLight,
    ViroOmniLight
} from 'react-viro';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    TouchableHighlight
} from 'react-native';
import * as atoms from '../../../assets/atoms.json';

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

function Lighting(): JSX.Element {
    return (
        <>
            <ViroOmniLight
                intensity={350}
                position={[-10, -10, 1]}
                color={'#FFFFFF'}
                attenuationStartDistance={20}
                attenuationEndDistance={30}
            />
            <ViroOmniLight
                intensity={350}
                position={[10, -10, 1]}
                color={'#FFFFFF'}
                attenuationStartDistance={20}
                attenuationEndDistance={30}
            />
            <ViroOmniLight
                intensity={350}
                position={[-10, 10, 1]}
                color={'#FFFFFF'}
                attenuationStartDistance={20}
                attenuationEndDistance={30}
            />
            <ViroOmniLight
                intensity={350}
                position={[10, 10, 1]}
                color={'#FFFFFF'}
                attenuationStartDistance={20}
                attenuationEndDistance={30}
            />
            <ViroOmniLight
                intensity={350}
                position={[10, 10, -1]}
                color={'#FFFFFF'}
                attenuationStartDistance={20}
                attenuationEndDistance={30}
            />
        </>
    );
}

interface Atom {
    id: number;
    symbol: string;
    name: string;
    category: string;
    mass: number;
    color: string;
}
function Scene(props: any): JSX.Element {
    const atomNums = [1, 1, 8];
    const [isTracking, setIsTracking] = React.useState(false);

    React.useEffect((): void => {
        createMaterials(atomNums);
    }, []);

    function onInitialized(state: any, reason: any): void {
        if (state == ViroConstants.TRACKING_NORMAL) {
            setIsTracking(true);
        } else if (state == ViroConstants.TRACKING_NONE) {
            setIsTracking(false);
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <Lighting />
            {atomNums.map(
                (atomNum, idx): JSX.Element => {
                    // @ts-ignore
                    const atom = atoms[atomNum.toString(10)];
                    return (
                        <ViroSphere
                            key={`atom_${idx}_${atomNum}`}
                            heightSegmentCount={20}
                            widthSegmentCount={20}
                            radius={0.01}
                            position={[0, -0.25 * (idx * 0.1), -0.25]}
                            scale={[1, 1, 1]}
                            materials={[atom.name.toLowerCase()]}
                            onClick={(): void => {
                                props.arSceneNavigator.viroAppProps.setClickedAtom(
                                    {
                                        id: atomNum,
                                        symbol: atom.symbol,
                                        name: atom.name,
                                        category: atom.category,
                                        mass: atom.mass,
                                        color: atom.hexColor
                                    }
                                );
                            }}
                        />
                    );
                }
            )}
        </ViroARScene>
    );
}

export function ViroAR(): JSX.Element {
    const [clickedAtom, setClickedAtom] = React.useState<Atom | null>(null);
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <ViroARSceneNavigator
                apiKey=""
                initialScene={{
                    scene: Scene
                }}
                viroAppProps={{
                    displayObject: true,
                    setClickedAtom: setClickedAtom
                }}
                autofocus={true}
                worldAlignment={'Gravity'}
            />
            {clickedAtom && (
                <SafeAreaView
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'black'
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 10,
                            paddingRight: 10,
                            paddingBottom: 50,
                            paddingLeft: 10
                        }}
                    >
                        <Text
                            style={{
                                flexDirection: 'column',
                                color: `#${clickedAtom.color}`
                            }}
                        >
                            {clickedAtom.id}
                            {clickedAtom.symbol}
                            {clickedAtom.name}
                            {clickedAtom.mass}
                            {clickedAtom.category}
                        </Text>
                        <TouchableHighlight
                            onPress={(): void => {
                                setClickedAtom(null);
                            }}
                        >
                            <Text style={{ color: 'white' }}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            )}
        </View>
    );
}
