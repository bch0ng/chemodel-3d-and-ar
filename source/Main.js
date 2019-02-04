import React, { Component } from 'react';
import { ActivityIndicator, 
         AppRegistry, 
         StyleSheet, 
         Image, 
         Text, 
         View, 
         TextInput,
         WebView,
         Dimensions } from 'react-native';
import FrontPage from './screens/front';
import ErrorPage from './screens/error';
import LoadingPage from './screens/loading'
import MainPage from './screens/main';
import styles from './styles/style';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {compound: '', 
                  cid: '',
                  info: '',
                  formula: '',
                  weight: '',
                  imgURL: 'https://www.vetbabble.com/wp-content/uploads/2016/11/hiding-cat.jpg',
                  found: 'null'};
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
        
        this.setState({ compound: name,
                        cid: cid,
                        info: 'Compount found :)',
                        formula: formula,
                        weight: weight,
                        imgURL: cidURL,
                        found: 'true'});
      } else {
        let errorURL = 'https://www.vetbabble.com/wp-content/uploads/2016/11/hiding-cat.jpg';
        this.setState({ compound: '', 
                        cid: '',
                        info: 'Compound not found :(',
                        imgURL: errorURL, 
                        found: 'false'});
      }
    } catch (error) {
      console.log(error);
    } 
  };

  render() {
    if (this.state.found == 'false') {
      return(
       <ErrorPage userInputCallback={ this.getCID } />
      );
    } else if (this.state.found == 'null' || this.state.compound == '') {
      return(
        <FrontPage userInputCallback={ this.getCID } />
      );
    } else if (this.state.found == 'loading') {
      return(
        <LoadingPage userInputCallback={ this.getCID } />
      );
    } else {
      return(
        <MainPage cid={ this.state.cid } compound={ this.state.compound } formula={ this.state.formula }
            mass={ this.state.weight } userInputCallback={ this.getCID } />
      );
    }
  }
}