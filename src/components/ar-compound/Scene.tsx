import { ViroARScene, ViroConstants } from 'react-viro';
import { Lighting } from './Lighting';
import { CompoundModel } from './CompoundModel';
import * as React from 'react';
import { Text, View } from 'react-native';

export function Scene(props: any): JSX.Element {
    const { compound, setClickedAtom } = props.arSceneNavigator.viroAppProps;
    const [trackingMessage, setTrackingMessage] = React.useState('');

    function onTrackingUpdated(state: any, reason: any): void {
        if (state == ViroConstants.TRACKING_NORMAL) {
            setTrackingMessage('');
        } else if (state == ViroConstants.TRACKING_NONE) {
            setTrackingMessage(
                'Having difficulty stabilizing. Please move the phone around.'
            );
        } else {
            setTrackingMessage('');
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onTrackingUpdated}>
            <Lighting />
            <CompoundModel
                compound={compound}
                setClickedAtom={setClickedAtom}
            />
            {trackingMessage !== '' && (
                <View style={{ backgroundColor: 'black' }}>
                    <Text style={{ color: 'white' }}>{trackingMessage}</Text>
                </View>
            )}
        </ViroARScene>
    );
}
