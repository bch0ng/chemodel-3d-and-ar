import * as React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import { SearchSuggestions } from './SearchSuggestions';
import * as styled from './SearchBar.styles';
import { useNavigation } from '@react-navigation/native';

export function SearchBar(): JSX.Element {
    const { query, updateQuery, onQuerySubmit } = useSearchContext();
    const [isFocused, setIsFocused] = React.useState(false);

    const navigation = useNavigation();

    return (
        <>
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
                    navigation.navigate('CompoundInfo');
                }}
                isFocused={isFocused}
            />
            {isFocused && <SearchSuggestions />}
        </>
    );
}
