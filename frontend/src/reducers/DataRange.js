import ActionTypes from '../constants/actionTypes';

const initialState = {
  startDate: '',
  endDate: ''
};

//y-m-d -> m/d/y
const convertDate = date => {
  const [year, month, day] = date.split('-');

  return `${month}/${day}/${year}`;
};

export const dataRange = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.START_DATE_SELECTED:
      return Object.assign({}, state, {
        startDate: convertDate(action.startDate)
      });
    case ActionTypes.END_DATE_SELECTED:
      return Object.assign({}, state, {
        endDate: convertDate(action.endDate)
      });
    default:
      return state;
  }
};
