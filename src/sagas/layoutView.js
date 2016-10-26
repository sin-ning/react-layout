/**
 * Created by sin on 16/7/21.
 */

import { takeLatest, sagaStack } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import { Promise } from 'es6-promise';
import { query } from '../services/layoutView';

function* _query(action) {
  const { jsonResult } = yield call(query, action.data);
  if (!jsonResult._c) {
    const { uri, title, keywords, description, layoutConfigs } = jsonResult.config;
    yield put({
      type: 'layoutView/query/success',
      data: {
        uri: uri,
        title: title,
        keywords: keywords,
        description: description,
        layoutConfigs: layoutConfigs, // 这个就是 renderList
      }
    });
  }
  else {
    console.info("不给力");
    yield put({
      type: 'layoutView/query/notFound'
    });
  }
}

///
/// watch

function* watchGet() {
  yield takeLatest('layoutView/config/query', _query);
}


///
/// export

export default function* () {
  yield fork(watchGet);
}
