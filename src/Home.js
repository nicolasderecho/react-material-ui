import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    emptySearch: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
      textAlign: 'center'
    }
});

const Home = function(props) {
    const { classes } = props;
    return <Grid item xs={10} sm={8} md={6}>
        <Paper className={classes.emptySearch}>
            Use the search Box to find your Movie!
        </Paper>
    </Grid>
}

export default withStyles(styles)(Home);