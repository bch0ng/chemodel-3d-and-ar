import * as React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as styled from './App.styles';
import {
    useCreateSearchContext,
    SearchContext
} from './src/contexts/SearchContext';
import { SearchBar } from './src/components/search/SearchBar';
import { CompoundARViewer } from './src/components/compound-viewer/CompoundViewer';

// Dismisses keyboard when pressed outside of an input field.
interface DismissKeyboardWrapperProps {
    children: React.ReactNode;
}
function DismissKeyboardWrapper(
    props: DismissKeyboardWrapperProps
): JSX.Element {
    const { children } = props;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}

export default function App(): JSX.Element {
    return (
        <SearchContext.Provider value={useCreateSearchContext()}>
            <DismissKeyboardWrapper>
                <styled.AppView>
                    <SearchBar />
                    <CompoundARViewer />
                </styled.AppView>
            </DismissKeyboardWrapper>
        </SearchContext.Provider>
    );
}