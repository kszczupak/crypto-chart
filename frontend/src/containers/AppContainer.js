import { connect } from 'react-redux';

import { connectToWAMP, fetchNews } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {};

const mapDispatchToProps = {
  initiateBackend: connectToWAMP,
  fetchNews
};

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
