import * as React from 'react';
import { ARNavigator } from '../components/ar-compound/ARNavigator';
import { View } from 'react-native';

export function ARViewer(): JSX.Element {
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <ARNavigator />
        </View>
    );
}
