import { combineReducers } from 'redux';

import { dataRange } from './dataRange';
import { news } from './news';
import { wampConnection } from './wampConnection';

export default combineReducers({
  dataRange,
  news,
  wampConnection
});
