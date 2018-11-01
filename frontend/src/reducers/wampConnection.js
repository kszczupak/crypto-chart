// reducer przechowujacy stan polaczenia WAMP ('CONNECTING', 'UNCONNECTED', 'CONNECTED', 'CONNECTION_ERROR')
// akcje operujace na WAMP beda magly w latwy sposob uzyskac status polaczenia np:

// export const someFunction = (someParams) => (dispatch, getState) => {
//   if (getState.connectionStatus != 'CONNECTED')
//     ...
// };

// Mozna tez wyswietlac stale informacje o polaczeniu

import ActionTypes from '../constants/actionTypes';
import { connectionState } from '../constants/connection';

const initialState = {
  state: connectionState.NOT_CONNECTED,
  connected: false,
  session: null
};

export const wampConnection = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.WAMP_CONNECTION_INITIATED:
      return Object.assign({}, state, {
        state: connectionState.CONNECTING
      });
    case ActionTypes.WAMP_CONNECTION_SUCCESS:
      return Object.assign({}, state, {
        state: connectionState.CONNECTED,
        connected: true,
        session: action.session
      });
    case ActionTypes.WAMP_CONNECTION_ERROR:
      return Object.assign({}, state, {
        state: connectionState.ERROR,
        connected: false
      });
    default:
      return state;
  }
};
