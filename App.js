import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
//import Main from './source/Main';
import MainPage from './source/screens/main';
import SearchBar from './source/components/search';
import JSMolAR from './source/components/jsmol.ar';

class HomePage extends Component {
  static navigationOptions = {
    header: null
  };

  getCID = async (compoundName) => {
    try {
      let url = 'https://pubchem.ncbi.nlm.nih.gov/compound/' + compoundName;
      let response = await fetch(url);
      let responseText = await response.text();
      let cidStart = responseText.search(/pubchem_uid_value\" content=\"/) + 'pubchem_uid_value" content="'.length;
      if (cidStart > 'pubchem_uid_value" content="'.length - 1) {
        let cidEnd = responseText.search(/\<meta name=\"viewport\"/);
        let cid = responseText.substring(cidStart, cidEnd);
        cid = cid.replace(/\D/g, '');
        let cidURL = 'https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=' + cid + '&width=300&height=300';

        let nameFetch = await fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/description/JSON');
        let nameFetchRes = await nameFetch.json();
        let name = nameFetchRes.InformationList.Information[0].Title;

        let molecFetch = await fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/property/MolecularFormula,MolecularWeight/JSON/');
        let molecFetchRes = await molecFetch.json();
        let formula = molecFetchRes.PropertyTable.Properties[0].MolecularFormula;
        let weight = molecFetchRes.PropertyTable.Properties[0].MolecularWeight;

        this.props.navigation.navigate('Main', {
          compound: name,
          cid: cid,
          info: 'Compound found :)',
          formula: formula,
          weight: weight,
          imgURL: cidURL,
          found: true,
          userInputCallback: this.getCID
        });
      } else {
        let errorURL = 'https://www.vetbabble.com/wp-content/uploads/2016/11/hiding-cat.jpg';
        this.props.navigation.navigate('Main', {
          compound: null,
          cid: null,
          info: 'Compound not found :(',
          imgURL: errorURL,
          found: false,
          userInputCallback: this.getCID
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: '#212121'}}>
          <SearchBar userInputCallback={ this.getCID } />
        </View>
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
  render() {
    return <AppContainer />;
  }
}