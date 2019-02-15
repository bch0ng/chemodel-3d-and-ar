import React, { Component } from 'react';
import { AppRegistry,
         TouchableOpacity,
         Image,
         Keyboard,
         Text, 
         View, 
         TextInput,
         TouchableWithoutFeedback,
         ScrollView,
         Dimensions,
         Platform,
         WebView } from 'react-native';
import SearchBar from '../components/search';
import JSMol from '../components/jsmol';
import JSMolAR from '../components/jsmol.ar';
import styles from '../styles/style';
const atomColors = require('../styles/colors.json');

export default class MainPage extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            visible3D: true,
            orientation: Dimensions.get('window').height >= Dimensions.get('window').width ? 'portrait' : 'landscape'
        }
    }

    componentDidMount() {
        console.log('Main page mounted!');
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: Dimensions.get('window').height >= Dimensions.get('window').width ? 'portrait' : 'landscape'
            });
        });
    }

    render() {
        const legend = [];
        if (this.props.navigation.state.params.model3DExists) {
            (new Set(this.props.navigation.state.params.elements.sort())).forEach((element) => {
                legend.push(<Text key={ atomColors[element].symbol } 
                        style={{ color: '#' + atomColors[element].hexColor, textAlign: 'center' }}>{ atomColors[element].name }</Text>);
            });
        }
        if (this.state.orientation === 'portrait') {
            if (this.props.navigation.state.params.found) {
            return(
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: '#212121'}}>
                        <View style={ styles.container }>
                            <SearchBar found={ this.props.navigation.state.params.found } userInputCallback={ this.props.navigation.state.params.userInputCallback } />
                        </View>
                        { this.state.visible3D && this.props.navigation.state.params.model3DExists && 
                            <JSMol cid={ this.props.navigation.state.params.cid } /> 
                            ||
                            <Image 
                                style={{ width: 300, height: 300, alignSelf: 'center' }}
                                source={{ uri: this.props.navigation.state.params.imgURL }} />
                        }
                        { this.props.navigation.state.params.model3DExists &&
                            <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-around' }}>
                                <TouchableOpacity style={ styles.button }
                                        disabled={ !this.props.navigation.state.params.model3DExists }
                                        onPress={ () => { this.setState({ visible3D: !this.state.visible3D })} }>
                                    <Text style={ styles.buttonText }>
                                        { this.state.visible3D && this.props.navigation.state.params.model3DExists ? "2D" : "3D" }
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={ styles.button }
                                    disabled={ !this.props.navigation.state.params.model3DExists }
                                    onPress={ () =>
                                        this.props.navigation.navigate('JSMolAR', {
                                            cid: this.props.navigation.state.params.cid,
                                            compound: this.props.navigation.state.params.compound,
                                            formula: this.props.navigation.state.params.formula,
                                            x: this.props.navigation.state.params.x,
                                            y: this.props.navigation.state.params.y,
                                            z: this.props.navigation.state.params.z,
                                            aid1: this.props.navigation.state.params.aid1,
                                            aid2: this.props.navigation.state.params.aid2,
                                            numBonds: this.props.navigation.state.params.numBonds,
                                            elements: this.props.navigation.state.params.elements
                                        }) 
                                    }>
                                    <Text style={ styles.buttonText }>AR</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                            <View style={{ flex: 0.25, flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center', marginBottom: 15 }}>
                                <Text style={ [styles.header, styles.text, { color: '#C5E1A5', width: Dimensions.get("window").width }] }>{ this.props.navigation.state.params.compound  }</Text>
                                <Text style={ styles.text }><Text style={{fontWeight: 'bold'}}>Formula:</Text> { this.props.navigation.state.params.formula }</Text>
                                <Text style={ styles.text }><Text style={{fontWeight: 'bold'}}>Mass:</Text> { this.props.navigation.state.params.mass }</Text>
                            </View>
                            <View style={{ flex: 0.5, height: 100 }}>
                            { this.props.navigation.state.params.model3DExists && this.state.visible3D &&
                                <View>
                                    <Text style={ [styles.header, styles.text, { fontSize: 20 }] }>Key:</Text>
                                    { legend }
                                </View>
                            }
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                );
            } else {
                return(
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: '100%', backgroundColor: '#212121'}}>
                            <View style={ styles.container }>
                                <SearchBar userInputCallback={ this.props.navigation.state.params.userInputCallback } />
                            </View>
                            <Image 
                                style={{ width: 300, height: 300, alignSelf: 'center' }}
                                source={{ uri: this.props.navigation.state.params.imgURL }} />
                            <Text style={ styles.text }>{ this.props.navigation.state.params.info }</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
        } else {
            if (this.props.navigation.state.params.found) {
                return(
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: '100%', backgroundColor: '#212121'}}>
                        <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        { this.state.visible3D && this.props.navigation.state.params.model3DExists && 
                            <JSMol cid={ this.props.navigation.state.params.cid } /> 
                            ||
                            <Image 
                                style={{ width: 300, height: 300, alignSelf: 'center' }}
                                source={{ uri: this.props.navigation.state.params.imgURL }} />
                        }
                        </View>
                        <View style={{ flex: 0.5, flexDirection: 'column' }}>
                            <View style={{
                                    flex: 0.5,
                                    backgroundColor: '#212121',
                                    alignItems: 'center' }}>
                                <SearchBar userInputCallback={ this.props.navigation.state.params.userInputCallback } />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                { this.props.navigation.state.params.model3DExists &&
                                    <View style={{ flexDirection: 'column', flex: 0.2, justifyContent: 'flex-start' }}>
                                        <TouchableOpacity style={ [styles.button, { width: '100%', margin: 25 }] }
                                                disabled={ !this.props.navigation.state.params.model3DExists }
                                                onPress={ () => { this.setState({ visible3D: !this.state.visible3D })} }>
                                            <Text style={ styles.buttonText }>
                                                { this.state.visible3D && this.props.navigation.state.params.model3DExists ? "2D" : "3D" }
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={ [styles.button, { width: '100%', margin: 25 }] }
                                            disabled={ !this.props.navigation.state.params.model3DExists }
                                            onPress={ () =>
                                                this.props.navigation.navigate('JSMolAR', {
                                                    cid: this.props.navigation.state.params.cid,
                                                    compound: this.props.navigation.state.params.compound,
                                                    formula: this.props.navigation.state.params.formula,
                                                    x: this.props.navigation.state.params.x,
                                                    y: this.props.navigation.state.params.y,
                                                    z: this.props.navigation.state.params.z,
                                                    aid1: this.props.navigation.state.params.aid1,
                                                    aid2: this.props.navigation.state.params.aid2,
                                                    numBonds: this.props.navigation.state.params.numBonds,
                                                    elements: this.props.navigation.state.params.elements
                                                }) 
                                            }>
                                            <Text style={ styles.buttonText }>AR</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <View style={{ flex: 0.3, flexDirection: 'column', textAlign: 'center'}}>
                                        <Text style={ [styles.header, styles.text, { color: '#C5E1A5' }] }>{ this.props.navigation.state.params.compound  }</Text>
                                        <Text style={ styles.text }><Text style={{fontWeight: 'bold'}}>Formula:</Text> { this.props.navigation.state.params.formula }</Text>
                                        <Text style={ styles.text }><Text style={{fontWeight: 'bold'}}>Mass:</Text> { this.props.navigation.state.params.mass }</Text>
                                    </View>
                                    <View style={{ flex: 0.7 }}>
                                        { this.props.navigation.state.params.model3DExists && this.state.visible3D &&
                                            <View>
                                                <Text style={ [styles.header, styles.text, { fontSize: 20 }] }>Key:</Text>
                                                { legend }
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                );
            } else {
                return(
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: '100%', backgroundColor: '#212121'}}>
                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                <Image 
                                    style={{ width: 300, height: 300, alignSelf: 'center' }}
                                    source={{ uri: this.props.navigation.state.params.imgURL }} />
                                <Text style={ styles.text }>{ this.props.navigation.state.params.info }</Text>
                            </View>
                            <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <View style={{
                                        flex: 0.25,
                                        backgroundColor: '#212121',
                                        alignItems: 'center' }}>
                                    <SearchBar userInputCallback={ this.props.navigation.state.params.userInputCallback } />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
        }
    }
}

