import React, { Component } from 'react';
import { AppRegistry,
         ActivityIndicator,
         Dimensions,
         Keyboard,
         View, 
         Text,
         TextInput,
         ScrollView,
         StyleSheet,
         TouchableOpacity } from 'react-native';
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            autoCompleteResults: [],
            focused: false,
            loading: false,
            submitted: false
        }
    }
    componentDidMount() {
        console.log('Searchbar mounted!');
    }
    componentDidUpdate() {
        if (this.state.loading || this.state.submitted) {
            this.setState({ loading: false, submitted: false });
        }
    }
    componentWillUnmount() {
        this.setState({ loading: false, submitted: false });
    }
    getAutoCompleteSearch = async (text) => {
        this.setState({ searchText: text });
        if (text.length >= 3) {
            let url = 'https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/' + text + '/json?limit=5';
            try {
                let response = await fetch(url);
                let responseJSON = await response.json();
                if (responseJSON.total > 0) {
                    this.setState({ autoCompleteResults: responseJSON.dictionary_terms.compound });
                } else {
                    this.setState({ autoCompleteResults: [] });
                }
            } catch {
                this.setState({ autoCompleteResults: [] });
            }
        } else {
            this.setState({ autoCompleteResults: [] });
        }
    }
    autoCompletePressed = (text) => {
        this.setState({ searchText: text, focused: false });
    }
    searchTextSubmit = () => {
        if (this.state.searchText !== '') {
            Keyboard.dismiss();
            this.setState({
                searchText: '',
                autoCompleteResults: [],
                focused: false,
                loading: true,
                submitted: true
            });
            this.props.userInputCallback(this.state.searchText);
        }
    }
    updateLoading = () => {
        this.setState({ loading: false });
    }
    render() {
        const predict = [];
        if (this.state.autoCompleteResults.length > 0) {
            this.state.autoCompleteResults.forEach((elem) => {
                predict.push(<TouchableOpacity key={ elem } 
                            onPress={ () => this.autoCompletePressed(elem) }
                            style={{ padding: 10, borderColor: "#fff", borderWidth: 2, marginRight: 10 }}>
                        <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}>{ elem }</Text>
                    </TouchableOpacity>)
            })
        }
        return(
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignSelf: 'flex-end' }}>
               <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput
                        style={ [searchStyle.searchBar, this.state.focused ? searchStyle.focusedSearchBar : '' ] }
                        placeholder='Enter Compound Here'
                        selectionColor={ '#81D4FA' }
                        value={ this.state.searchText }
                        onChangeText={ (text) => this.getAutoCompleteSearch(text) }
                        onFocus={ () => this.setState({ focused: true })}
                        onBlur={ () => this.setState({ focused: false })}
                        placeholderTextColor='rgba(129,212,250,0.7)'
                        onSubmitEditing={ this.searchTextSubmit }
                    />
                    { this.state.loading &&
                        <ActivityIndicator color="#fff" />
                        ||
                         <TouchableOpacity
                            disabled={ this.state.searchText === '' }
                            style={{ backgroundColor: 'transparent', borderColor: this.state.searchText === '' ? 'rgba(97,97,97,0.5)' : '#81D4FA', borderWidth: 2, width: '20%', borderRadius: 3, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, alignSelf: 'center' }}
                            onPress={ this.searchTextSubmit }>
                            <Text style={{ textAlign: 'center', color: this.state.searchText === '' ? 'rgba(97,97,97,0.5)' : '#81D4FA' }}>Search</Text>
                        </TouchableOpacity>
                    }
                </View>
                { this.state.focused &&
                <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <ScrollView keyboardShouldPersistTaps="handled" horizontal={ true } showsHorizontalScrollIndicator={ false }>
                            <View style={{ flex: 1, flexDirection: 'row', height: 45, justifyContent: 'center', alignItems: 'center'  }}>
                                { predict }
                            </View>
                        </ScrollView>
                    </View>
                </View>
                }
            </View>
        );
    }
}
const searchStyle = StyleSheet.create({
  searchBar: {
    alignSelf: 'center',
    color: '#81D4FA',
    fontSize: 20,
    textAlign: 'center',
    width: '70%',
    marginRight: 0,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(129,212,250,0.5)',
    borderWidth: 2,
    padding: 5,
    borderRadius: 3
  },
  focusedSearchBar: {
    borderBottomColor: 'rgba(129,212,250,1)'
  }
});