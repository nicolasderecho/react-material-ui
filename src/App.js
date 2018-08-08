import React, { Component } from 'react';
import Header from './Header';
import ResultsList from './ResultsList';
import HttpService from './HttpService';
import Home from './Home';
import AppContainer from './AppContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.httpService = new HttpService();
    this.state = { results: [], total: 0, fetching: false, waitingFirstSearch: true, errorFetching: false };
  }

  checkIfIsFirstRequest = () => {
    if(this.state.waitingFirstSearch) {
      this.setState({waitingFirstSearch: false});
    }
  }

  searchMovies = (textToSearch) => {
    this.checkIfIsFirstRequest();
    this.setState({fetching: true, errorFetching: false});
    this.httpService
        .request({ url: 'http://www.omdbapi.com',  params: { s: textToSearch, apikey: '4d69050d'} })
        .then((response) => { 
          this.setState({results: response.data.Search || [], total: Number(response.data.totalResults), fetching: false});
        })
        .catch(() => {
          this.setState({fetching: false, errorFetching: true});
        });
  }

  render() {
    const { waitingFirstSearch, results, fetching } = this.state;
    return (<React.Fragment>
      <Header searchMovies={this.searchMovies} />
      <AppContainer>
        { waitingFirstSearch ? <Home /> : <ResultsList results={results} fetching={fetching} findDetails={this.findDetails} /> }
      </AppContainer>
    </React.Fragment>
    );
  }
}

export default App;
