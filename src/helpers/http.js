import {default as axios} from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {BACKEND_URL} from './utils';

const http = (token, useUpload, method = null, path = '', body = []) => {
  if (useUpload) {
    return RNFetchBlob.fetch(
      method,
      `${BACKEND_URL}${path}`,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body,
    );
  }
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: BACKEND_URL,
    headers,
  });
};
export default (axios, http);
