import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const { _c, _m } = res.jsonResult;
  // if (_c) {
  //   return Promise.reject(_m);
  // }
  return res;
}

function xFetch(url, options) {
  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
    authorization: cookie.get('authorization') || '',
  };

  // const serverUrl = "http://172.21.113.3:8080";
  const serverUrl = "http://127.0.0.1:8080";

  return fetch(serverUrl + url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export default xFetch;
