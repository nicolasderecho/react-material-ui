import React, { Component } from 'react';
import Header from './Header';
import SearchContent from './SearchContent';
import HttpService from './HttpService';
import {SearchBox} from "./SearchBox";

import { createStyles, withStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";

const styles = createStyles({
  root: { marginTop: '24px', paddingLeft: '24px', paddingRight: '24px' },
  search: { marginBottom: '20px', textAlign: 'center' }

});

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.httpService = new HttpService();
    this.state = { results: [], total: 0, fetching: false, waitingFirstSearch: true, errorFetching: false };
  }

  checkIfIsFirstRequest = () => {
    if(this.state.waitingFirstSearch) {
      this.setState({waitingFirstSearch: false});
    }
  };

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
    const { classes } = this.props;
    const { waitingFirstSearch, results, fetching } = this.state;
    return (<React.Fragment>
      <Header />
      <Grid container className={classes.root} justify='center' alignContent='center'>
        <Grid item xs={12} className={classes.search}>
          <SearchBox searchMovies={this.searchMovies} />
        </Grid>
        { !waitingFirstSearch && <SearchContent results={results} fetching={fetching} /> }
      </Grid>
    </React.Fragment>
    );
  }
}

const App = withStyles(styles)(AppComponent);

export default App;
