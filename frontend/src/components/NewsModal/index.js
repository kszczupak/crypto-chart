import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import NewsList from '../NewsList';

const styles = theme => ({
  newsModal: {
    display: 'block',
    margin: 'auto',
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

class NewsModal extends Component {
  displayNews = () => {
    return <NewsList news={this.props.news} />;
  };

  displayContent = () => {
    if (this.props.isNewsLoading) {
      return (
        // Trick to center element easily in the parent
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      );
    }

    return this.displayNews();
  };

  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="News Modal"
        aria-describedby="News fetched from google for given period of time"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <div className={classes.newsModal}>{this.displayContent()}</div>
      </Modal>
    );
  }
}

NewsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(NewsModal);
