import React from 'react';
import { Toolbar, AppBar, Grid, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    searchBox: {     
        background: 'white',
        borderRadius: '20px'
    },
    input: { textAlign: 'center'  },
    app: {
        justifyContent: 'space-between'
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { search: '' };
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.props.searchMovies(this.state.search);
        }
    }

    render = () => {
        const { classes } = this.props;
        return <Grid container>
            <AppBar position='static' >
                <Toolbar className={classes.app}>
                    <Input
                        id="search"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        margin="none"
                        className={classes.searchBox}
                        classes={ {input: classes.input}}
                    />
                    IMDB Reloaded
                </Toolbar>
            </AppBar>
        </Grid>;
    }
}

export default withStyles(styles)(Header);