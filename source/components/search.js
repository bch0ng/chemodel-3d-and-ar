import React, { Component } from 'react';
import { AppRegistry,
         View, 
         TextInput } from 'react-native';
import styles from '../styles/style';

export default class SearchBar extends Component {
    componentDidMount() {
        console.log('Searchbar mounted!');
    }
    render() {
        return(
            <TextInput
                style={ styles.search }
                placeholder='Compound Name'
                placeholderTextColor='rgba(189, 189, 189, 0.3)'
                onSubmitEditing={({ nativeEvent }) => this.props.userInputCallback(nativeEvent.text)}
            />
        );
    }
}