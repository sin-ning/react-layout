/**
 * Created by sin on 16/7/21.
 */

import { takeLatest, sagaStack } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import { Promise } from 'es6-promise';
import { queryConfig, save, queryTools, saveLayout, saveLayoutCustom, removeLayoutCustom } from '../services/layout';

function* _queryTools() {
  const { jsonResult } = yield call(queryTools);
  console.info('jsonResult', jsonResult);
  yield put({
    type: 'layout/tools/query/success',
    data: jsonResult.tools
  });
}

function* _save(action) {
  try {
    const { jsonResult } = yield call(save, action.data);
    yield put({
      type: 'layout/config/hide',
    });
    message.success('保存成功!');


  } catch (e) {
    message.error(e);
  }
}

function* _queryConfig(action) {
  try {
    const { jsonResult } = yield call(queryConfig, action.data);
    console.info('jsonResultjsonResult', jsonResult);
    yield put({
      type: 'layout/config/query/success',
      data: {
        layoutConfig: jsonResult.config,
        renderList: jsonResult.config.layoutConfigs,
      }
    });
  } catch (e) {
    message.error(e);
  }
}

function* _saveLayout(action) {
  try {
    const { jsonResult } = yield call(saveLayout, action.data.data);
    message.success('保存成功!');

    yield put({
      type: 'layout/tools/query',
    });
  } catch (e) {
    message.error(e);
  }
}

function* _saveLayoutCustom(action) {
  try {
    const { jsonResult } = yield call(saveLayoutCustom, action.data);

    if (jsonResult._c != 0) {
      message.error(jsonResult._m);
    }
    else {
      message.success('保存成功!');

      yield put({
        type: 'layout/edit/save/layoutCustom',
        data: {
          data: jsonResult.data,
          renderIndex: action.data.renderIndex,
        }
      });

      yield put({
        type: 'layout/tools/query',
      });
    }
  } catch (e) {
    message.error(e);
  }
}

function* _removeLayoutCustom(action) {
  try {
    const { jsonResult } = yield call(removeLayoutCustom, action.data);
    if (jsonResult._c) {
      message.success(jsonResult._m);
    }
    else {
      message.success('删除成功!');
      yield put({
        type: 'layout/tools/query',
      });
    }
  } catch (e) {
    message.error(e);
  }
}



///
/// watch

function* watchGet() {
  yield takeLatest('layout/tools/query', _queryTools);
}

function* watchSave() {
  yield takeLatest('layout/save', _save);
}

function* watchGetConfig() {
  yield takeLatest('layout/queryConfig', _queryConfig);
}

function* watchSaveLayout() {
  yield takeLatest('layout/saveLayout', _saveLayout);
}


function* watchSaveLayoutCustom() {
  yield takeLatest('layout/saveLayoutCustom', _saveLayoutCustom);
}


function* watchRemoveLayoutCustom() {
  yield takeLatest('layout/removeLayoutCustom', _removeLayoutCustom);
}


export default function* () {
  yield fork(watchGet);
  yield fork(watchSave);
  yield fork(watchSaveLayout);
  yield fork(watchSaveLayoutCustom);
  yield fork(watchRemoveLayoutCustom);
  yield fork(watchGetConfig);

  // Load users.
  // const routing = yield select(({ routing }) => routing);
  // yield put({
  //   type: 'layout/tools/query',
  //   payload: routing.locationBeforeTransitions.query,
  //   initial: true,
  // });
}
