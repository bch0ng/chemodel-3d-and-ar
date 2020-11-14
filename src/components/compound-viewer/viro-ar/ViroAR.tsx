import * as React from 'react';
import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroARSceneNavigator
} from 'react-viro';
import { View, Text, ActivityIndicator } from 'react-native';

function Scene(): JSX.Element {
    const [isTracking, setIsTracking] = React.useState(false);

    function onInitialized(state: any, reason: any): void {
        if (state == ViroConstants.TRACKING_NORMAL) {
            setIsTracking(true);
        } else if (state == ViroConstants.TRACKING_NONE) {
            setIsTracking(false);
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <ViroText
                text={isTracking ? 'Hello world' : 'Bye world'}
                position={[0, 0, -1]}
                style={{ color: 'black' }}
            />
        </ViroARScene>
    );
}

export function ViroAR(): JSX.Element {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Invoked when a model has started to load, we show a loading indictator.
    function onLoadStart() {
        setIsLoading(true);
    }

    // Invoked when a model has loaded, we hide the loading indictator.
    function onLoadEnd() {
        setIsLoading(false);
    }

    function renderTrackingText() {
        if (isInitialized) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#ffffff22',
                        left: 30,
                        right: 30,
                        top: 30,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>
                        Tracking initialized.
                    </Text>
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#ffffff22',
                        left: 30,
                        right: 30,
                        top: 30,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>
                        Waiting for tracking to initialize.
                    </Text>
                </View>
            );
        }
    }

    function onTrackingInit() {
        setIsInitialized(true);
    }

    return (
        <View>
            <ViroARSceneNavigator
                apiKey=""
                initialScene={{
                    scene: Scene
                }}
                viroAppProps={{
                    displayObject: false,
                    yOffset: 0,
                    _onLoadEnd: onLoadEnd,
                    _onLoadStart: onLoadStart,
                    _onTrackingInit: onTrackingInit
                }}
            />
            {renderTrackingText()}
            {isLoading && (
                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        animating={isLoading}
                        color="#ffffff"
                    />
                </View>
            )}
        </View>
    );
}
