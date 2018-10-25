import ActionTypes from '../actions/ActionTypes';
import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';

class DataRangeStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_DATE_SELECTED:
        return [action.payload, state[1]];
      case ActionTypes.END_DATE_SELECTED:
        return [state[0], action.payload];
      default:
        return state;
    }
  }
}

export default new DataRangeStore();
