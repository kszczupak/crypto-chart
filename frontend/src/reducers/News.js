import ActionTypes from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  data: []
};

export const news = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEWS_START:
      return Object.assign({}, state, {
        isLoading: true
      });
    case ActionTypes.FETCH_NEWS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        data: JSON.parse(action.news)
      });
    default:
      return state;
  }
};
