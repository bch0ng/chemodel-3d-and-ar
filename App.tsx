import * as React from 'react';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import {
    useCreateSearchContext,
    SearchContext
} from './src/contexts/SearchContext';

const AppView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default function App(): JSX.Element {
    setStatusBarStyle('light');
    return (
        <SearchContext.Provider value={useCreateSearchContext()}>
            <AppView>
                <Text>Open up App.tsx to start working on your app!</Text>
                <StatusBar style="auto" />
            </AppView>
        </SearchContext.Provider>
    );
}
