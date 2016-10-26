/**
 * Created by sin on 16/7/20.
 */

import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
import { Clone } from '../util/ObjectUtil';

const layoutView = handleActions({
  ['layoutView/query/success'](state, action) {
    return {...action.data, ...{notFound: false}};
  },
  ['layoutView/query/notFound'](state) {
    return {...state, ...{notFound: true}};
  },
}, {
  notFound: false, // 未找到 page, 跳往 404 页面
  uri: '',
  title: '',
  keywords: '',
  description: '',
  layoutConfigs: [], // 这个就是 renderList
});

export default layoutView;
