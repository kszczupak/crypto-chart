import ActionTypes from '../actions/ActionTypes';

const initialState = {
  startDate: '',
  endDate: ''
};

export const dataRange = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.START_DATE_SELECTED:
      return Object.assign({}, state, {
        startDate: action.startDate
      });
    case ActionTypes.END_DATE_SELECTED:
      return Object.assign({}, state, {
        endDate: action.endDate
      });
    default:
      return state;
  }
};
