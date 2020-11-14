import { ViroSphere } from 'react-viro';
import * as React from 'react';
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import { Atom } from '@local-types';

interface AtomModelProps {
    name: string;
    idx: number;
    onClick: () => void;
}
export function AtomModel(props: AtomModelProps): JSX.Element {
    const { name, idx, onClick } = props;

    return (
        <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.01}
            position={[0, -0.25 * (idx * 0.1), -0.25]}
            scale={[1, 1, 1]}
            materials={[name]}
            onClick={onClick}
        />
    );
}

interface AtomInfoProps {
    atom: Atom;
    onClose: () => void;
}
export function AtomInfo(props: AtomInfoProps): JSX.Element {
    const { atom, onClose } = props;

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 50,
                paddingLeft: 10
            }}
        >
            <Text
                style={{
                    flexDirection: 'column',
                    color: `#${atom.color}`
                }}
            >
                {atom.id}
                {atom.symbol}
                {atom.name}
                {atom.mass}
                {atom.category}
            </Text>
            <TouchableHighlight onPress={onClose}>
                <Text style={{ color: 'white' }}>Close</Text>
            </TouchableHighlight>
        </View>
    );
}
