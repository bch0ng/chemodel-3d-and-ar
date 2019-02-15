import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#212121',
    alignItems: 'center',
    marginTop: 50
  },
  button: {
    borderColor: '#EF9A9A',
    borderWidth: 2,
    backgroundColor: 'transparent',
    width: '20%',
    borderRadius: 5,
    padding: 15,
  },
  buttonText: {
    color: '#EF9A9A',
    textAlign: 'center'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
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