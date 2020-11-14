import * as React from 'react';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import {
    useCreateSearchContext,
    SearchContext
} from './src/contexts/SearchContext';
import { SearchBar } from './src/components/search-bar/SearchBar';

// Dismisses keyboard when pressed outside of an input field.
interface DismissKeyboardProps {
    children: React.ReactNode;
}
function DismissKeyboard(props: DismissKeyboardProps): JSX.Element {
    const { children } = props;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}

const AppView = styled.SafeAreaView`
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
            <DismissKeyboard>
                <AppView style={{ backgroundColor: 'black' }}>
                    <SearchBar />
                    <StatusBar style="auto" />
                </AppView>
            </DismissKeyboard>
        </SearchContext.Provider>
    );
}
