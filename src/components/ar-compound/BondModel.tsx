import * as React from 'react';
import { ViroPolyline } from 'react-viro';
import { Coordinates } from '@types';
import {
    NORMALIZER,
    DOUBLE_BOND_OFFSET,
    BOND_THICKNESS
} from '../../constants';

interface BondModelProps {
    from: Coordinates;
    to: Coordinates;
    isDoubleBond?: boolean;
}
export function BondModel(props: BondModelProps): JSX.Element {
    const { from, to, isDoubleBond } = props;
    const offset = isDoubleBond ? DOUBLE_BOND_OFFSET : 0;

    return (
        <ViroPolyline
            position={[0, 0, 0]}
            points={[
                [
                    from.x / NORMALIZER + offset,
                    from.y / NORMALIZER + offset,
                    from.z / NORMALIZER - 0.25
                ],
                [
                    to.x / NORMALIZER + offset,
                    to.y / NORMALIZER + offset,
                    to.z / NORMALIZER - 0.25
                ]
            ]}
            thickness={BOND_THICKNESS}
            materials={'bond'}
            ignoreEventHandling={true}
        />
    );
}
