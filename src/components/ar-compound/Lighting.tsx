import { ViroOmniLight } from 'react-viro';
import * as React from 'react';

export function Lighting(): JSX.Element {
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
