import * as React from 'react';
import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

export function ViroAR(): JSX.Element {
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
