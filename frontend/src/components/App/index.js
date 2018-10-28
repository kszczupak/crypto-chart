import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import grey from '@material-ui/core/colors/grey';
import './index.css';
// import NewsCard from '../NewsCard/index';
// import NewsList from '../../containers/NewsList/index';
// import NewsStore from '../../stores/NewsStore';
// import DataRangeStore from '../../stores/DataRangeStore';
// import { fetchNews } from '../../actions/Actions';
// import DataRangePicker from '../DataRangePicker';
import DataRangeContainer from './../../containers/DataRangeContainer/index';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import NewsModalContainer from '../NewsModal';
import { DataRangePickerContainer } from './../../containers/DataRangePickerContainer';
import { NewsModalContainer } from './../../containers/NewsModalContainer';

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

  componentDidMount() {
    // AppActions.testing_fetchNews();
    // AppActions.fetchNews('bitcoin', '1/1/2017', '1/2/2017');
  }

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
      </div>
    );
  }
}

export default withStyles(styles)(App);
