import * as React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { SafeAreaView, View, Text, Modal } from 'react-native';
import { Atom, CompoundData } from '@types';
import { Scene } from './Scene';
import { AtomInfo } from './AtomModel';
import { useRoute, RouteProp } from '@react-navigation/native';
import {
    FlatList,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native-gesture-handler';
import { TipModal } from './TipModal';

type StackParamList = {
    ARViewer: { compound: CompoundData };
};

type ARViewerRouteProp = RouteProp<StackParamList, 'ARViewer'>;

export function ARNavigator(): JSX.Element {
    const route = useRoute<ARViewerRouteProp>();
    const { compound } = route.params;
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
