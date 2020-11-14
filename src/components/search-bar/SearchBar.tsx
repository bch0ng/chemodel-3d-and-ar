import * as React from 'react';
import { Text, TextInput, View } from 'react-native';

export function SearchBar(): JSX.Element {
    const [query, setQuery] = React.useState('');

    return (
        <View>
            <TextInput
                placeholder="Enter Compound Here"
                selectionColor={'#81D4FA'}
                value={query}
                onChangeText={setQuery}
                placeholderTextColor="rgba(129,212,250,0.7)"
                onSubmitEditing={this.searchTextSubmit}
            />
        </View>
    );
}
