import React, { Component } from 'react';
import { AppRegistry, 
         Image, 
         Text, 
         View, 
         TextInput } from 'react-native';
import SearchBar from '../components/search';
import styles from '../styles/style';

export default class ErrorPage extends Component {
    componentDidMount() {
        console.log('Error page mounted!');
    }

    render() {
        return(
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: '100%', backgroundColor: '#212121'}}>
                <View style={{marginTop: 100}}>
                    <SearchBar userInputCallback={ this.props.userInputCallback } />
                    <Image 
                        style={{width: 300, height: 300}}
                        source={{uri: 'https://www.vetbabble.com/wp-content/uploads/2016/11/hiding-cat.jpg'}} />
                    <Text style={styles.text}>Compound not found :(</Text>
                </View>
            </View>
        );
    }
}