import React from 'react';
import {Modal, Card, CardContent, Typography, Chip, CardMedia, Grid, CircularProgress, Hidden} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';

const styles = theme => ({
    modalContent: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        transform: 'translate(12%, 15%)'
    },
    chip: {
        margin: theme.spacing.unit,
    },
    card: { display: 'flex', justifyContent: 'space-between' },
    cover: {
        flex: '0 0 135px',
        backgroundSize: 'cover'
      },
    progress: { textAlign: 'center' },
    modal: {overflowY: 'auto'}
});

class Details extends React.Component {

    renderProgress = () => {
        const { classes } = this.props;
        return <Grid item xs={12} className={classes.progress}>
            <CircularProgress size={60} />
        </Grid>
    }
    
    renderDetails = () => {
      const { classes, target } = this.props;
      return <Card className={classes.card}>
          <CardContent>
              <Typography variant="headline" component="h2">
                {target.Title}
              </Typography>
              <Typography color="textSecondary">{target.Released} - {target.Runtime}</Typography>
              <Typography component="div">
                Genre: { target.Genre.split(',').map((string) => <Chip className={classes.chip} key={string} label={string.trim()} />) }
              </Typography>
              <Typography component="div">
                  Actors: { target.Actors.split(',').map((string) => <Chip className={classes.chip} key={string} label={string.trim()} />) }
              </Typography>
              <Typography> {target.Plot} </Typography>
          </CardContent>
          <Hidden xsDown>
            <CardMedia title={target.Title} image={target.Poster} className={classes.cover}/>
          </Hidden>  
      </Card>
    }

    render() {
        const { display, onCloseDetails, fetching, classes, target } = this.props;
        return <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={display} onClose={onCloseDetails} className={classes.modal} >
            <div className={classes.modalContent}>
                { fetching || isEmpty(target) ? this.renderProgress() : this.renderDetails() }
            </div>
        </Modal>
    }
}

export default withStyles(styles)(Details);