// reducer przechowujacy stan polaczenia WAMP ('CONNECTING', 'UNCONNECTED', 'CONNECTED', 'CONNECTION_ERROR')
// akcje operujace na WAMP beda magly w latwy sposob uzyskac status polaczenia np:

// export const someFunction = (someParams) => (dispatch, getState) => {
//   if (getState.connectionStatus != 'CONNECTED')
//     ...
// };

// Mozna tez wyswietlac stale informacje o polaczeniu

import ActionTypes from '../constants/actionTypes';
import { stage } from '../constants/connection';

const initialState = {
  stage: stage.NOT_CONNECTED,
  connected: false,
  session: null
};

export const wampConnection = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.WAMP_CONNECTION_INITIATED:
      return {
        ...state,
        stage: stage.CONNECTING
      };
    case ActionTypes.WAMP_CONNECTION_SUCCESS:
      return {
        ...state,
        stage: stage.CONNECTED,
        connected: true,
        session: action.session
      };
    case ActionTypes.WAMP_CONNECTION_ERROR:
      return {
        ...state,
        stage: stage.ERROR,
        connected: false
      };
    default:
      return state;
  }
};
