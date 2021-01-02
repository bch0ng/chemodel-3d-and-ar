import * as React from 'react';
import { ARNavigator } from '../components/ar-compound/ARNavigator';
import { View, Text } from 'react-native';
import { useSearchContext } from '../contexts/SearchContext';

export function ARViewer(): JSX.Element {
    const { compound } = useSearchContext();

    if (!compound?.data) {
        return (
            <View>
                <Text>No compound found view</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <ARNavigator compound={compound.data} />
        </View>
    );
}
