import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSearchContext } from '../../contexts/SearchContext';
import { SearchSuggestions } from './SearchSuggestions';
import * as styled from './SearchBar.styles';

export function SearchBar(): JSX.Element {
    const { query, updateQuery, onQuerySubmit } = useSearchContext();
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View>
            <styled.SearchInput
                placeholder="Enter Compound Here"
                selectionColor={'#81D4FA'}
                value={query}
                onChangeText={updateQuery}
                onFocus={(): void => setIsFocused(true)}
                onBlur={(): void => setIsFocused(false)}
                placeholderTextColor="rgba(129,212,250,0.7)"
                onSubmitEditing={(): void => {
                    onQuerySubmit();
                }}
            />
            {isFocused && <SearchSuggestions />}
        </View>
    );
}
