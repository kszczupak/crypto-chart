// reducer przechowujacy stan polaczenia WAMP ('CONNECTING', 'UNCONNECTED', 'CONNECTED', 'CONNECTION_ERROR')
// akcje operujace na WAMP beda magly w latwy sposob uzyskac status polaczenia np:

// export const someFunction = (someParams) => (dispatch, getState) => {
//   if (getState.connectionStatus != 'CONNECTED')
//     ...
// };

// Mozna tez wyswietlac stale informacje o polaczeniu

import ActionTypes from '../constants/actionTypes';
import { connectionState } from './../constants/connection';

const initialState = connectionState.NOT_CONNECTED;

export const connection = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.WAMP_CONNECTION_INITIATED:
      return connectionState.CONNECTING;
    case ActionTypes.WAMP_CONNECTION_SUCCESS:
      return connectionState.CONNECTED;
    case ActionTypes.WAMP_CONNECTION_ERROR:
      return connectionState.ERROR;
    default:
      return state;
  }
};
