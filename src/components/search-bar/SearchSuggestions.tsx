import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface SearchSuggestionsProps {
    query: string;
}
export function SearchSuggestions(props: SearchSuggestionsProps): JSX.Element {
    const { query } = props;

    return (
        <View>
            <TouchableOpacity
                key={elem}
                onPress={() => this.autoCompletePressed(elem)}
                style={{
                    padding: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                    marginRight: 10
                }}
            >
                <Text
                    style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}
                >
                    {elem}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
