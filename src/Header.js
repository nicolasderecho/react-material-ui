import React from 'react';
import { Toolbar, AppBar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    app: {
        justifyContent: 'space-between'
    }
});

class Header extends React.Component {

    shouldComponentUpdate(){
      return false;
    }

    render(){
        const { classes } = this.props;
        return <Grid container>
            <AppBar position='static' >
                <Toolbar className={classes.app}>
                    IMDB Reloaded
                </Toolbar>
            </AppBar>
        </Grid>;
    }
}

export default withStyles(styles)(Header);