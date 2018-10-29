import ActionTypes from '../../constants/actionTypes';

export const initiateWAMP_Connection = () => ({
  type: ActionTypes.WAMP_CONNECTION_INITIATED
});

export const successfulWAMP_Connection = () => ({
  type: ActionTypes.WAMP_CONNECTION_SUCCESS
});

export const WAMP_ConnectionError = () => ({
  type: ActionTypes.WAMP_CONNECTION_ERROR
});
