import ActionTypes from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  data: []
};

export const news = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEWS_START:
      return {
        isLoading: true,
        data: []
      };
    case ActionTypes.FETCH_NEWS_SUCCESS:
      return {
        isLoading: false,
        data: JSON.parse(action.news)
      };
    default:
      return state;
  }
};
