import React from 'react';
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DetailsContainer from './DetailsContainer';
import {SearchResults} from "./SearchResults";

const styles = theme => ({
    root: { marginTop: '24px' },
    emptySearch: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
      textAlign: 'center'
    },
    progress: {
        textAlign: 'center',
        marginTop: '20px'
    },
    modalContent: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        transform: 'translate(100%, 100%)'
    }
});

class SearchContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openModal: false, targetId: '' }
    }

    closeModal = () => {
        this.setState({openModal: false, targetId: ''});
    }

    displayModal = (id) => {
        this.setState({openModal: true, targetId: id});
    }

    renderProgress = (classes) => {
        return <Grid item xs={12} className={classes.progress}>
            <CircularProgress size={60} />
        </Grid>
    }

    renderEmptyResults = () => {
        const { classes } = this.props;
        return <Grid item xs={10} sm={8} md={6}>
            <Paper className={classes.emptySearch}>
                No se encontraron resultados :(
            </Paper>            
        </Grid> 
    }

    render() {
        const { classes, fetching, results } = this.props;
        if(fetching) {
            return this.renderProgress(classes);
        }

        if(!fetching && results.length === 0) {
            return this.renderEmptyResults();
        }

        return <React.Fragment>
          <SearchResults results={results} displayModal={this.displayModal} />
          { this.state.openModal && <DetailsContainer display={this.state.openModal} onClose={this.closeModal} targetId={this.state.targetId}/> }
        </React.Fragment>
    }
}

SearchContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchContent);
