import * as React from 'react';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as styled from './App.styles';
import {
    useCreateSearchContext,
    SearchContext
} from './src/contexts/SearchContext';
import { SearchBar } from './src/components/search/SearchBar';

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

export default function App(): JSX.Element {
    setStatusBarStyle('light');
    return (
        <SearchContext.Provider value={useCreateSearchContext()}>
            <DismissKeyboard>
                <styled.AppView>
                    <SearchBar />
                    <StatusBar style="auto" />
                </styled.AppView>
            </DismissKeyboard>
        </SearchContext.Provider>
    );
}
