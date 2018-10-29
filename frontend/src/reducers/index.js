import { combineReducers } from 'redux';

import { dataRange } from './dataRange';
import { news } from './news';
import { connection } from './connection';

export default combineReducers({
  dataRange,
  news,
  connection
});
