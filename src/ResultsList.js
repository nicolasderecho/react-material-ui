import React from 'react';
import { Paper, Grid, CircularProgress, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DetailsContainer from './DetailsContainer';

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
    card: {
        cursor: 'pointer',
        height: '100%'
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    modalContent: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        transform: 'translate(100%, 100%)'
    },
    grid: { marginBottom: '20px', paddingRight: '10px' }
});

class ResultsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openModal: false, targetId: '' }
    }

    closeModal = () => {
        this.setState({openModal: false, targetId: ''});
    }

    openModal = (id) => {
        this.setState({openModal: true, targetId: id});
    }

    openDetailsFor = (id) => {
        return () => { this.openModal(id) }
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

    renderResults = () => {
        const { classes, results } = this.props;
        const cards = results.map((searchResult) => <Grid item xs={10} sm={6} md={4} lg={3} key={searchResult.imdbID} className={classes.grid}>
            <Card className={classes.card} onClick={this.openDetailsFor(searchResult.imdbID)}>
                <CardMedia className={classes.cardMedias} title={searchResult.Title} image={searchResult.Poster} />
                <CardContent>
                    <Typography variant="headline" component="h2">{searchResult.Title}</Typography>
                    <Typography color="textSecondary" >{searchResult.Year}</Typography>
                </CardContent>
            </Card>
        </Grid>)
        return <React.Fragment>
            {cards}
            { this.state.openModal && <DetailsContainer display={this.state.openModal} onClose={this.closeModal} targetId={this.state.targetId}/> }
        </React.Fragment>   
    }

    render() {
        const { classes, fetching, results } = this.props;
        if(fetching) {
            return this.renderProgress(classes);
        }
        return <React.Fragment>
            { results.length === 0 ? this.renderEmptyResults() : this.renderResults() }
        </React.Fragment>
    }
}

ResultsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsList);
