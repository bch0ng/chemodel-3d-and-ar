import * as React from 'react';
import {
    ViroARScene,
    ViroText,
    ViroSphere,
    ViroConstants,
    ViroARSceneNavigator,
    ViroMaterials,
    ViroBox
} from 'react-viro';
import { View, Text, ActivityIndicator } from 'react-native';

ViroMaterials.createMaterials({
    grid: {
        diffuseTexture: require('../../../../assets/grid_bg.jpg')
    }
});

function Scene(): JSX.Element {
    const [isTracking, setIsTracking] = React.useState(false);
    const [hasTouched, setHasTouched] = React.useState(false);

    function onInitialized(state: any, reason: any): void {
        if (state == ViroConstants.TRACKING_NORMAL) {
            setIsTracking(true);
        } else if (state == ViroConstants.TRACKING_NONE) {
            setIsTracking(false);
        }
    }

    function onTouch(): void {
        setHasTouched(!hasTouched);
    }

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            {hasTouched && (
                <ViroText
                    text={isTracking ? 'Hello world' : 'Bye world'}
                    position={[0, 0, -1]}
                    style={{ color: 'black', fontSize: 30 }}
                />
            )}
            <ViroSphere
                heightSegmentCount={20}
                widthSegmentCount={20}
                radius={0.01}
                position={[0, -0.25, -0.25]}
                scale={[1, 1, 1]}
                materials={['grid']}
                onClick={onTouch}
            />
        </ViroARScene>
    );
}

export function ViroAR(): JSX.Element {
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <ViroARSceneNavigator
                apiKey=""
                initialScene={{
                    scene: Scene
                }}
                viroAppProps={{
                    displayObject: true
                }}
                autofocus={true}
                worldAlignment={'Gravity'}
            />
        </View>
    );
}
