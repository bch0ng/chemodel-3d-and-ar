import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 0.25,
    backgroundColor: '#212121',
    alignItems: 'center',
    marginTop: 100
  },
  button: {
    backgroundColor: '#fff',
    width: '33.33%',
    borderRadius: 5,
    padding: 15,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center'
  },
  text: {
    color: '#C5E1A5',
    textAlign: 'center'
  },
  search: {
    color: '#DA70D6',
    fontSize: 50,
    textAlign: 'center',
  },
  loader: {
    top: 100,
  },
  modelViewer: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});