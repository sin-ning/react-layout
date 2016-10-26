/**
 * Created by sin on 16/7/20.
 */

import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
import { Clone } from '../util/ObjectUtil';

const layoutList = handleActions({
  ['layoutList/query/success'](state, action) {
    console.info('xxoo', action);
    return { ...state,  ...{list: action.data.result} };
  }
}, {
  list: []
});

export default layoutList;
