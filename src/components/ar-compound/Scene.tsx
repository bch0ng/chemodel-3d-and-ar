import { ViroARScene } from 'react-viro';
import { Lighting } from './Lighting';
import { CompoundModel } from './CompoundModel';
import * as React from 'react';

export function Scene(props: any): JSX.Element {
    const { setClickedAtom } = props.arSceneNavigator.viroAppProps;

    return (
        <ViroARScene>
            <Lighting />
            <CompoundModel setClickedAtom={setClickedAtom} />
        </ViroARScene>
    );
}
