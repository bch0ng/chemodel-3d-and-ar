import * as React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    View,
    StatusBar
} from 'react-native';
import * as styled from './App.styles';
import {
    useCreateSearchContext,
    SearchContext
} from './contexts/SearchContext';
import { SearchBar } from './components/search/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationOptions
} from '@react-navigation/stack';
import { Home } from './screens/Home';
import { ARViewer } from './screens/ARViewer';

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

const Stack = createStackNavigator();

function ScreenStack(): JSX.Element {
    const stackHeaderOptions: StackNavigationOptions = {
        headerTintColor: 'white',
        headerTitle: 'Chemodel',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16
        },
        headerBackTitleStyle: {
            fontSize: 14
        },
        headerTransparent: true
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackHeaderOptions}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ARViewer" component={ARViewer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App(): JSX.Element {
    return (
        <SearchContext.Provider value={useCreateSearchContext()}>
            <DismissKeyboardWrapper>
                <ScreenStack />
            </DismissKeyboardWrapper>
        </SearchContext.Provider>
    );
}
