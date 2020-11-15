import * as React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { useSearchContext } from '../contexts/SearchContext';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

export function CompoundInfo(): JSX.Element {
    const { compound } = useSearchContext();
    const navigation = useNavigation();
    const headerHeight: number = useHeaderHeight();

    React.useEffect((): void => {
        if (compound && compound.name) {
            navigation.setOptions({ title: compound.name });
        }
    }, [compound]);

    if (!compound) {
        return <Text>Error</Text>;
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: 'black',
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <View
                style={{
                    marginTop: headerHeight
                }}
            >
                <Image
                    style={{
                        width: 300,
                        height: 300
                    }}
                    source={{
                        uri: compound.imageURL
                    }}
                />
                <Text style={{ color: 'white' }}>{compound.name}</Text>
                {compound && compound.data && (
                    <TouchableHighlight
                        style={{
                            backgroundColor: 'gray',
                            padding: 10,
                            marginTop: 10,
                            width: 50
                        }}
                        onPress={(): void => {
                            navigation.navigate('ARViewer', {
                                compound: compound.data
                            });
                        }}
                    >
                        <Text style={{ color: 'white' }}>AR</Text>
                    </TouchableHighlight>
                )}
            </View>
        </SafeAreaView>
    );
}
