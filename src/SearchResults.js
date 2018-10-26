import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import isEqual from 'lodash/isEqual';

const styles = theme => ({
  card: {
    cursor: 'pointer',
    height: '100%'
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  grid: { marginBottom: '20px', paddingRight: '10px' }
});

class SearchResultsComponent extends Component {

  shouldComponentUpdate(nextProps) {
     return !isEqual(nextProps.results, this.props.results);
  }

  render(){
    const { classes, results, displayModal } = this.props;
    return results.map((searchResult) => <Grid item xs={10} sm={6} md={4} lg={3} key={searchResult.imdbID} className={classes.grid}>
      <Card className={classes.card} onClick={() => displayModal(searchResult.imdbID) }>
        <CardMedia className={classes.cardMedia} title={searchResult.Title} image={searchResult.Poster} />
        <CardContent>
          <Typography variant="headline" component="h2">{searchResult.Title}</Typography>
          <Typography color="textSecondary" >{searchResult.Year}</Typography>
        </CardContent>
      </Card>
    </Grid>)
  }

}

const SearchResults = withStyles(styles)(SearchResultsComponent);

export { SearchResults }