import * as React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { SafeAreaView, View } from 'react-native';
import { Atom, CompoundData } from '@types';
import { Scene } from './Scene';
import { AtomInfo } from './AtomModel';
import { TipModal } from './TipModal';

interface ARNavigatorProps {
    compound: CompoundData;
}

export function ARNavigator(props: ARNavigatorProps): JSX.Element {
    const { compound } = props;
    const [clickedAtom, setClickedAtom] = React.useState<Atom | null>(null);

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <ViroARSceneNavigator
                initialScene={{
                    scene: Scene
                }}
                viroAppProps={{
                    displayObject: true,
                    compound,
                    setClickedAtom: setClickedAtom
                }}
                autofocus={true}
                worldAlignment={'Gravity'}
            />
            <TipModal />
            {clickedAtom && (
                <SafeAreaView
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'black'
                    }}
                >
                    <AtomInfo
                        atom={clickedAtom}
                        onClose={(): void => {
                            setClickedAtom(null);
                        }}
                    />
                </SafeAreaView>
            )}
        </View>
    );
}
