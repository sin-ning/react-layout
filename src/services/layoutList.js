/**
 * Created by sin on 16/7/26.
 */
import xFetch from './xFetch';
import qs from 'qs';

export async function query(params) {
  return xFetch(`/layout/configList.json?${qs.stringify(params)}`);
}
