import React, { Component } from 'react';
import { AppRegistry, 
         View, 
         Text,
         TextInput } from 'react-native';
import SearchBar from '../components/search';
import styles from '../styles/style';

export default class FrontPage extends Component {
    componentDidMount() {
        console.log('Front page mounted!');
    }
    render() {
        return(
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: '100%', backgroundColor: '#212121'}}>
                <View style={{ marginTop: 100 }}>
                    <SearchBar userInputCallback={ this.props.userInputCallback } />
                </View>
            </View>
        );
    }

}