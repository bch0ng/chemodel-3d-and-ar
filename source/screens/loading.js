import React, { Component } from 'react';
import { AppRegistry, 
         Image, 
         Text, 
         View, 
         TextInput } from 'react-native';
import SearchBar from '../components/search';
import styles from '../styles/style';

export default class LoadingPage extends Component {
    render() {
        return(
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: '100%', backgroundColor: '#212121'}}>
                <View style={{marginTop: 100}}>
                    <SearchBar userInputCallback={ this.props.userInputCallback } />
                    <ActivityIndicator style={styles.loader} size="large" color="#999" />
                    <Text> {this.state.info} </Text>
                </View>
            </View>
        );
    }
}