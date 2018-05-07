import { combineReducers } from 'redux';
import items from './items';
import comments from './comments';

export default combineReducers({
  items,
  comments,
});
