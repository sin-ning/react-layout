/**
 * Created by sin on 16/7/21.
 */

import { takeLatest, sagaStack } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import { Promise } from 'es6-promise';
import { query } from '../services/layoutList';

function* _query() {
  const { jsonResult } = yield call(query);
  yield put({
    type: 'layoutList/query/success',
    data: jsonResult.page
  });
}

function* watchGet() {
  yield takeLatest('layoutList/query', _query);
}

export default function* () {
  yield fork(watchGet);
}
