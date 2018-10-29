import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { DataRangePickerContainer } from '../../containers/DataRangePickerContainer';
import { NewsModalContainer } from './../../containers/NewsModalContainer';
import DataRangeContainer from './../../containers/DataRangeContainer/index';
import Connection from '../Connection';
import './index.css';

import { connectionState } from './../../constants/connection';

const styles = theme => ({
  header: {
    backgroundColor: grey[900],
    height: 20,
    padding: 20,
    marginBottom: 20
  },
  titleLabel: { color: grey[50] },
  button: {}
});

class App extends Component {
  state = {
    newsModalOpen: false
  };

  handleFetchNewsButton = () => {
    this.props.fetchNews();
    this.setState({ newsModalOpen: true });
  };

  handleNewsModalClose = () => {
    this.setState({ newsModalOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <header className={classes.header}>
          <Typography
            className={classes.titleLabel}
            variant="title"
            align="center"
          >
            Crypto News
          </Typography>
        </header>
        <DataRangePickerContainer />
        <Grid container justify="center">
          <Button onClick={this.handleFetchNewsButton} variant="contained">
            FETCH NEWS
          </Button>
        </Grid>
        <DataRangeContainer />
        <NewsModalContainer
          open={this.state.newsModalOpen}
          onClose={this.handleNewsModalClose}
        />
        <Connection connectionState={connectionState.CONNECTING} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
