import * as styled from '../App.styles';
import { SearchBar } from '../components/search/SearchBar';
import * as React from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import { View } from 'react-native';

export function Home(): JSX.Element {
    const headerHeight: number = useHeaderHeight();

    return (
        <styled.AppView>
            <View
                style={{
                    marginTop: headerHeight
                }}
            >
                <SearchBar />
            </View>
        </styled.AppView>
    );
}
