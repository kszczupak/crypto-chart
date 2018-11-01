import autobahn from 'autobahn';

import ActionTypes from '../../constants/actionTypes';
import config from '../../config.json';

const connectionInitiated = () => ({
  type: ActionTypes.WAMP_CONNECTION_INITIATED
});

const connectionSuccessful = session => ({
  type: ActionTypes.WAMP_CONNECTION_SUCCESS,
  session
});

const wampError = message => ({
  type: ActionTypes.WAMP_ERROR,
  message
});

export const connectToWAMP = () => (dispatch, getState) => {
  // if already connected, skip for now
  // it could dispatch event as warning about informing about this attempt
  if (getState().wampConnection.connected) return;

  dispatch(connectionInitiated());

  const URL = `ws://${config.crossbar.host}:${config.crossbar.port}/ws`;

  // Moze byc const?
  let wampConnection = new autobahn.Connection({
    url: URL,
    realm: config.crossbar.realm
    //   authmethods: ['wampcra'],
    //   authid: config.analytics.auth.username,
    //   onchallenge: this.onChallenge
  });

  wampConnection.onopen = session => {
    dispatch(connectionSuccessful(session));
  };

  wampConnection.open();
};

export const callRPC = (endpoint, args, wampConnection, dispatch) => {
  if (!wampConnection.connected) {
    return dispatch(wampError('Connection not ready yet! Operation failed.'));
  }

  return wampConnection.session.call(endpoint, args);
};
