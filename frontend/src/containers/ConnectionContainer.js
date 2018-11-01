import { connect } from 'react-redux';

import Connection from '../components/Connection';

const mapStateToProps = state => ({
  connectionStage: state.wampConnection.stage
});

export const ConnectionContainer = connect(mapStateToProps)(Connection);
