import * as React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { SafeAreaView, View } from 'react-native';
import { Atom } from '@local-types';
import { Scene } from './Scene';
import { AtomInfo } from './AtomModel';

export function ARNavigator(): JSX.Element {
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
                    <AtomInfo
                        atom={clickedAtom}
                        onClose={(): void => setClickedAtom(null)}
                    />
                </SafeAreaView>
            )}
        </View>
    );
}
