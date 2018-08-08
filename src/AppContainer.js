import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = createStyles({ root: { marginTop: '24px', paddingLeft: '24px', paddingRight: '24px' } });

const AppContainer = function(props) {
    const { classes } = props;
    return <Grid container className={classes.root} justify='center' alignContent='center'>
        {props.children}
    </Grid>
}

export default withStyles(styles)(AppContainer);