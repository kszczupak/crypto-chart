import { connect } from 'react-redux';

import { fetchNews } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {};

const mapDispatchToProps = { fetchNews };

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
