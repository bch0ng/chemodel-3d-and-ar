import React from 'react';
import { ActivityIndicator, 
         AppRegistry, 
         StyleSheet, 
         Image, 
         Text, 
         View, 
         TextInput,
         WebView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props); // ???
    this.state = {compound: '', 
                  cid: '',
                  info: '',
                  imgURL: 'https://www.vetbabble.com/wp-content/uploads/2016/11/hiding-cat.jpg',
                  found: 'null'};
  }

  async getCID(compoundName) {
    this.setState({ compound: compoundName, 
                    cid: '',
                    info: 'Searching...',
                    imgURL: 'https://www.ourshopee.com/img/loader.gif',
                    found: 'loading'});
    try {
      var url = 'https://pubchem.ncbi.nlm.nih.gov/compound/' + compoundName;
      let response = await fetch(url);
      let responseText = await response.text();
      var cidStart = responseText.search(/pubchem_uid_value\" content=\"/) + 'pubchem_uid_value" content="'.length;
      if (cidStart > 'pubchem_uid_value" content="'.length - 1) {
        var cidEnd = responseText.search(/\<meta name=\"viewport\"/);
        var cid = responseText.substring(cidStart, cidEnd);
        cid = cid.replace(/\D/g, '');
        var cidURL = 'https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=' + cid + '&width=300&height=300';
        
        
        var nameStart = responseText.search(/<title>/) + '<title>'.length;
        var nameEnd = responseText.search(/\|/) - 1;
        var name = responseText.substring(nameStart, nameEnd)
        
        this.setState({ compound: name,
                        cid: cid,
                        info: 'Compound found :)',
                        imgURL: cidURL, 
                        found: 'true'});
      } else {
        var errorURL = 'https://www.vetbabble.com/wp-content/uploads/2016/11/hiding-cat.jpg';
        this.setState({ compound: '', 
                        cid: '',
                        info: 'Compound not found :(',
                        imgURL: errorURL, 
                        found: 'false'});
      }
    } catch (error) {
      return error;
    } 
  }

  async getCompoundName() {
    try {
      var url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/record/JSON/?record_type=2d&response_type=display';
      let response = await fetch(url);
      let responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson.Record.Section.Information.StringValue);
      this.setState({info: responseJson});
    } catch (error) {
      return error;
    }
  }

  render() {
    if (this.state.found == 'null' || this.state.compound == '') {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.fontStyle}
            placeholder='Compound Name'
            onSubmitEditing={({ nativeEvent }) => this.getCID(nativeEvent.text)}
          />
        </View>
      )
    } else if (this.state.found == 'loading') {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.fontStyle}
            placeholder='Compound Name'
            onSubmitEditing={({ nativeEvent }) => this.getCID(nativeEvent.text)}
          />
          <ActivityIndicator style={styles.loader} size="large" color="#999" />
          <Text> {this.state.info} </Text>
        </View>
      )
    } else {
      const jsmol = require('./jsmol/lite.html');

      const rawHTML = `
        <!DOCTYPE html>
          <html>
            <title>3D Molecule Viewer</title>
            <head>
              <meta charset="utf-8">
              <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              <script type="text/javascript" src="http://yourjavascript.com/44817082211/jsmol-lite-nojq.js"></script>
              <style>
           
              </style>
              <script type="text/javascript"> 
                var Info;
                ;(function() {
                Info = {
                  color: "fff",
                  width: 900,
                  height: 900,
                  addSelectionOptions: false,
                  shadeAtoms: true,
                  serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
                  use: "HTML5",
                  readyFunction: null,
                  defaultModel: ":` + this.state.cid + `",
                  bondWidth: 4,
                  zoomScaling: 1.5,
                  pinchScaling: 5.0,
                  mouseDragFactor: 1,
                  touchDragFactor: 5,
                  multipleBondSpacing: 4,
                  debug: false
                }
                })();
              </script>
            </head>
            <body>
              <script>
                Jmol.getTMApplet("jmol", Info)
              </script>
            </body>
          </html>
      `
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', height: 1000}}>
          <View style={styles.container}>
            <TextInput
              style={styles.fontStyle}
              placeholder='Compound Name'
              onSubmitEditing={({ nativeEvent }) => this.getCID(nativeEvent.text)}
            />
            <Text style={{ flex: 1, textAlign: 'center' }}>{this.state.compound}</Text>
          </View>
          <WebView
            style={styles.modelViewer}
            source={{ html: rawHTML }}
            scrollEnabled={ false }
            bounce={ false }
          />
        </View>

        /* <View style={styles.container}>
          <TextInput
            style={styles.fontStyle}
            placeholder='Compound Name'
            onSubmitEditing={({ nativeEvent }) => this.getCID(nativeEvent.text)}
          />
          <Image 
            style={{width: 300, height: 300}}
            source={{uri: this.state.imgURL }} />
          <Text>{this.state.info}</Text>
        </View> */
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    top: 100,
  },
  fontStyle: {
    color: '#DA70D6',
    fontSize: 50,
    textAlign: 'center',
  },
  loader: {
    top: 100,
  },
  modelViewer: {
    flex: 1,
    top: -200,
    marginLeft: 25,
  }
});