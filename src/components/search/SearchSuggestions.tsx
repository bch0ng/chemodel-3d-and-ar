import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useSearchContext } from '../../contexts/SearchContext';
import * as styled from './SearchSuggestions.styles';

interface SearchSuggestionProps {
    suggestion: string;
}
function SearchSuggestion(props: SearchSuggestionProps): JSX.Element {
    const { suggestion } = props;
    const { selectSuggestion } = useSearchContext();

    return (
        <styled.SearchSuggestionItem
            onPress={(): void => selectSuggestion(suggestion)}
        >
            <styled.SearchSuggestionText>
                {suggestion}
            </styled.SearchSuggestionText>
        </styled.SearchSuggestionItem>
    );
}

export function SearchSuggestions(): JSX.Element {
    const { suggestions } = useSearchContext();

    if (suggestions.length < 1) {
        return <></>;
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View>
                {suggestions.map((suggestion, idx) => (
                    <SearchSuggestion
                        key={`suggestion_${idx}_${suggestion}`}
                        suggestion={suggestion}
                    />
                ))}
            </View>
        </ScrollView>
    );
}
