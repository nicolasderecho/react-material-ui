import React, { Component } from 'react';
import {Input} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  searchBox: {
    background: 'white',
    height: '60px',
    width: '50%'
  },
  input: { textAlign: 'center'  }
});

class SearchBoxComponent extends Component {

  state = { search: '' };

  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.props.searchMovies(this.state.search);
    }
  };

  shouldComponentUpdate(nextProps,nextState) {
    return nextState.search !== this.state.search;
  }

  render(){
    const { classes } = this.props;
    return <Input
      id="search"
      placeholder="Search a Movie, TV show or series"
      value={this.state.search}
      onChange={this.handleChange}
      onKeyPress={this.handleKeyPress}
      margin="none"
      className={classes.searchBox}
      classes={ {input: classes.input}}
    />
  }
}

const SearchBox = withStyles(styles)(SearchBoxComponent);

export {SearchBox}
