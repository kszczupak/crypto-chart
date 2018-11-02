import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import ConnectingIcon from '@material-ui/core/CircularProgress';
import ConnectedIcon from '@material-ui/icons/CloudDoneOutlined';
import NotConnectedIcon from '@material-ui/icons/CloudOff';
import ConnectionErrorIcon from '@material-ui/icons/CloudOffOutlined';
import PropTypes from 'prop-types';

import { stage } from './../constants/connection';

const iconCommon = {
  marginRight: 8
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  iconConnected: {
    ...iconCommon,
    fontSize: 32,
    color: green[500]
  },
  iconNotConnected: {
    ...iconCommon,
    fontSize: 32
  },
  iconConnecting: { ...iconCommon },
  iconConnectionError: {
    ...iconCommon,
    fontSize: 32,
    color: red[500]
  }
});

class Connection extends Component {
  renderState = () => {
    switch (this.props.connectionStage) {
      case stage.CONNECTING:
        return this.stateConnecting();
      case stage.CONNECTED:
        return this.stateConnected();
      case stage.NOT_CONNECTED:
        return this.stateNotConnected();
      case stage.ERROR:
        return this.stateError();
      default:
        Error(`Unsupported connection state ${this.props.connectionStage}`);
    }
  };

  stateConnected = () => (
    <div className={this.props.classes.root}>
      <ConnectedIcon className={this.props.classes.iconConnected} />
      <Typography variant="subheading">Connected</Typography>
    </div>
  );

  stateNotConnected = () => (
    <div className={this.props.classes.root}>
      <NotConnectedIcon className={this.props.classes.iconNotConnected} />
      <Typography variant="subheading">Not Connected</Typography>
    </div>
  );

  stateConnecting = () => (
    <div className={this.props.classes.root}>
      <ConnectingIcon className={this.props.classes.iconConnecting} size={32} />
      <Typography variant="subheading">Connecting</Typography>
    </div>
  );

  stateError = () => (
    <div className={this.props.classes.root}>
      <ConnectionErrorIcon className={this.props.classes.iconConnectionError} />
      <Typography variant="subheading">Connection Error</Typography>
    </div>
  );

  render() {
    return this.renderState();
  }
}

Connection.propTypes = { connectionStage: PropTypes.string.isRequired };

export default withStyles(styles)(Connection);
