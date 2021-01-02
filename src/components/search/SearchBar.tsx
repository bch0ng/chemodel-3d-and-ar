import * as React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import { SearchSuggestions } from './SearchSuggestions';
import * as styled from './SearchBar.styles';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Keyboard } from 'react-native';

export function SearchBar(): JSX.Element {
    const { query, updateQuery, onQuerySubmit } = useSearchContext();
    const [isFocused, setIsFocused] = React.useState(false);

    const inputRef = React.useRef<TextInput | null>(null);

    React.useEffect((): void => {
        if (!isFocused && inputRef.current) {
            inputRef.current.blur();
            Keyboard.dismiss();
        }
    }, [isFocused]);

    const navigation = useNavigation();

    return (
        <>
            <styled.SearchInput
                ref={inputRef}
                placeholder="Enter Compound Here"
                selectionColor={'#81D4FA'}
                value={query}
                onChangeText={updateQuery}
                onFocus={(): void => setIsFocused(true)}
                onBlur={(): void => setIsFocused(false)}
                placeholderTextColor="rgba(129,212,250,0.7)"
                onSubmitEditing={(): void => {
                    onQuerySubmit();
                    navigation.navigate('ARViewer');
                    Keyboard.dismiss();
                }}
                isFocused={isFocused}
            />
            {isFocused && <SearchSuggestions />}
        </>
    );
}
