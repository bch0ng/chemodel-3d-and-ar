import React, { Component } from 'react';
import { AppLoading, Asset } from 'expo';
import {
  Button,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Platform,
  Image,
  StatusBar
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
//import Main from './source/Main';
import MainPage from './source/screens/main';
import SearchBar from './source/components/search';
import JSMolAR from './source/components/jsmolAR';

class HomePage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      landscape : Dimensions.get("window").width > Dimensions.get("window").height
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({ landscape: Dimensions.get("window").width > Dimensions.get("window").height });
    });
  }

  getCID = async (compoundName) => {
    try {
      let url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/' + compoundName + '/record/JSON/';
      let response = await fetch(url);
      let responseJSON = await response.json();
      if (!responseJSON.Fault) {
        /*
        let cidEnd = responseText.search(/\<meta name=\"viewport\"/);
        let cid = responseText.substring(cidStart, cidEnd);
        cid = cid.replace(/\D/g, '');
        */
        let cid = responseJSON.PC_Compounds[0].id.id.cid;
        let cidURL = 'https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=' + cid + '&width=300&height=300';

        let nameFetch = await fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/description/JSON');
        let nameFetchRes = await nameFetch.json();
        let name = nameFetchRes.InformationList.Information[0].Title;

        let molecFetch = await fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/property/MolecularFormula,MolecularWeight/JSON/');
        let molecFetchRes = await molecFetch.json();
        let formula = molecFetchRes.PropertyTable.Properties[0].MolecularFormula;
        let weight = molecFetchRes.PropertyTable.Properties[0].MolecularWeight;

        await this.getMoleculeCoords(cid);
        this.props.navigation.navigate('Main', {
          compound: name,
          cid: cid,
          info: 'Compound found :)',
          formula: formula,
          mass: weight,
          imgURL: cidURL,
          found: true,
          userInputCallback: this.getCID,
          x: this.state.x,
          y: this.state.y,
          z: this.state.z,
          aid1: this.state.aid1,
          aid2: this.state.aid2,
          numBonds: this.state.numBonds,
          elements: this.state.elements,
          model3DExists: this.state.model3DExists
        });
      } else {
        let errorURL = 'https://images.pexels.com/photos/374898/pexels-photo-374898.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
        this.props.navigation.navigate('Main', {
          compound: null,
          cid: null,
          info: 'Compound not found :(',
          imgURL: errorURL,
          found: false,
          userInputCallback: this.getCID
        });
      }
    } catch {
      this.props.navigation.navigate('Main', {
          compound: null,
          cid: null,
          info: 'Could not get compound :(',
          imgURL: errorURL,
          found: false,
          userInputCallback: this.getCID
        });
    }
  };

  getMoleculeCoords = async (cid) => {
    try {
      let url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' +
        cid + '/record/JSON/?record_type=3d&response_type=display';
      let response = await fetch(url);
      let json = await response.json();
      if (typeof json.PC_Compounds !== 'undefined') {
        let conformers = json.PC_Compounds[0].coords[0].conformers[0];
        let aid1 = json.PC_Compounds[0].bonds.aid1;
        let aid2 = json.PC_Compounds[0].bonds.aid2;
        let numBonds = json.PC_Compounds[0].bonds.order;
        let elements = json.PC_Compounds[0].atoms.element;
        this.setState({
          x: conformers.x,
          y: conformers.y,
          z: conformers.z,
          aid1: aid1,
          aid2: aid2,
          numBonds: numBonds,
          elements: elements,
          model3DExists: true
        });
      } else {
        this.setState({
          model3DExists: false
        });
      }
      console.log("Results received.");
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  };

  iphoneXCheck = () => {
    const dim = Dimensions.get('window');
  
    return (
      // This has to be iOS
      Platform.OS === 'ios' &&
      
      // Check either, iPhone X or XR
      ((dim.height == 812 || dim.width == 812) || (dim.height == 896 || dim.width == 896))
    );
  }


  render() {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#212121', paddingLeft: this.iphoneXCheck() && this.state.landscape ? 50 : 0, paddingBottom: 50 }}>
            <SearchBar userInputCallback={ this.getCID } />
            <Image 
              style={{ flex: 0.5, backgroundColor: 'transparent', alignSelf: 'center' }}
              resizeMode='contain'
              source={ require('../images/chemodel_logo.png') } />
          </View>
        </TouchableWithoutFeedback>
      );
  }
}

const RootStack = createStackNavigator({
    Home: {
      screen: HomePage,
    },
    Main: {
      screen: MainPage,
    },
    JSMolAR: {
      screen: JSMolAR,
    }
  }, {
    initialRouteName: 'Home',
    mode: 'card',
    headerMode: 'float',
    headerTransparent: 'true'
});

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }

  async _cacheResourcesAsync() {
    const images = [
      require('../images/chemodel_logo.png'),
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <AppContainer />;
  }
}