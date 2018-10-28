import { combineReducers } from 'redux';

import { dataRange } from './DataRange';
import { news } from './News';

export default combineReducers({
  dataRange,
  news
});
