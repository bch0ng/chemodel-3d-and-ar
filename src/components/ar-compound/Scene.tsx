import { ViroARScene, ViroConstants, ViroNode } from 'react-viro';
import { Lighting } from './Lighting';
import { CompoundModel } from './CompoundModel';
import * as React from 'react';
import { Text, View } from 'react-native';

export function Scene(props: any): JSX.Element {
    const { compound, setClickedAtom } = props.arSceneNavigator.viroAppProps;
    const [trackingMessage, setTrackingMessage] = React.useState('');
    const sceneRef = React.useRef(null);

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

    const [position, setPosition] = React.useState<number[]>([0, 0, 0]);
    function onDrag(dragToPos: number[], source: any): void {
        setPosition(dragToPos);
    }

    return (
        <ViroARScene onTrackingUpdated={onTrackingUpdated}>
            <Lighting />
            <ViroNode position={position} onDrag={onDrag}>
                <CompoundModel
                    compound={compound}
                    setClickedAtom={setClickedAtom}
                />
            </ViroNode>
            {trackingMessage !== '' && (
                <View style={{ backgroundColor: 'black' }}>
                    <Text style={{ color: 'white' }}>{trackingMessage}</Text>
                </View>
            )}
        </ViroARScene>
    );
}
