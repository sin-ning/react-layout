/**
 * Created by sin on 16/7/26.
 */
import xFetch from './xFetch';
import qs from 'qs';

export async function queryTools() {
  return xFetch(`/layout/tools.json`);
}

export async function save(params) {
  return xFetch('/layout/save.json', {
    method: 'post',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: qs.stringify({config: JSON.stringify(params)}),
  });
}

export async function queryConfig(params) {
  return xFetch(`/layout/configId.json?${qs.stringify(params)}`);
}

export async function saveLayout(params) {
  return xFetch('/layout/saveLayout.json', {
    method: 'post',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: qs.stringify({config: JSON.stringify(params)}),
  });
}


export async function saveLayoutCustom(params) {
  return xFetch('/layout/saveLayoutCustom.json', {
    method: 'post',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: qs.stringify({config: JSON.stringify(params.data)}),
  });
}


export async function removeLayoutCustom(params) {
  return xFetch('/layout/removeLayoutCustom.json', {
    method: 'post',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: qs.stringify(params),
  });
}
