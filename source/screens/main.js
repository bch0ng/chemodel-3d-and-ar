import React, { Component } from 'react';
import { AppRegistry,
         TouchableOpacity,
         Image,
         Text, 
         View, 
         TextInput,
         WebView } from 'react-native';
import SearchBar from '../components/search';
import JSMol from '../components/jsmol';
import JSMolAR from '../components/jsmol.ar';
import styles from '../styles/style';

export default class MainPage extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            visible3D: true
        }
    }

    componentDidMount() {
        console.log('Main page mounted!');
    }

    render() {
        if (this.props.navigation.state.params.found) {
           return(
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: '#212121'}}>
                    <View style={ styles.container }>
                        <SearchBar userInputCallback={ this.props.navigation.state.params.userInputCallback } />
                    </View>
                    { this.state.visible3D && 
                        <JSMol cid={ this.props.navigation.state.params.cid } /> 
                        ||
                        <Image 
                            style={{ width: 300, height: 300, alignSelf: 'center' }}
                            source={{ uri: this.props.navigation.state.params.imgURL }} />
                    }
                    <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-around' }}>
                        <TouchableOpacity style={ styles.button }
                            onPress={ () => { this.setState({ visible3D: !this.state.visible3D })} }>
                            { this.state.visible3D && 
                                <Text style={ styles.buttonText }>2D</Text>
                                ||
                                <Text style={ styles.buttonText }>3D</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.button }
                            onPress={ () =>
                                this.props.navigation.navigate('JSMolAR', {
                                    cid: this.props.navigation.state.params.cid,
                                    compound: this.props.navigation.state.params.compound,
                                    formula: this.props.navigation.state.params.formula
                                }) 
                            }>
                            <Text style={ styles.buttonText }>AR</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center'}}>
                        <Text style={ [styles.header, styles.text] }>{ this.props.navigation.state.params.compound  }</Text>
                        <Text style={ styles.text }>Formula: { this.props.navigation.state.params.formula }</Text>
                        <Text style={ styles.text }>Mass: { this.props.navigation.state.params.mass }</Text>
                    </View>
                </View>
            );
        } else {
            return(
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: '100%', backgroundColor: '#212121'}}>
                    <View style={{marginTop: 100 }}>
                        <SearchBar userInputCallback={ this.props.navigation.state.params.userInputCallback } />
                        <Image 
                            style={{ width: 300, height: 300, alignSelf: 'center' }}
                            source={{ uri: this.props.navigation.state.params.imgURL }} />
                        <Text style={ styles.text }>{ this.props.navigation.state.params.info }</Text>
                    </View>
                </View>
            );
        }
        
    }
}

