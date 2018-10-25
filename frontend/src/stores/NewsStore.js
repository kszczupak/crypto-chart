import ActionTypes from '../actions/ActionTypes';
import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NewsStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.FETCH_NEWS_START:
        return [];
      case ActionTypes.FETCH_NEWS_SUCCESS:
        return JSON.parse(action.payload.response);
      default:
        return state;
    }
  }
}

export default new NewsStore();
