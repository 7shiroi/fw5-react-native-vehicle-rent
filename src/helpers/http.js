import {default as axios} from 'axios';
import {BACKEND_URL} from './utils';

const http = (token, useUpload) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (useUpload) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  return axios.create({
    baseURL: BACKEND_URL,
    headers,
  });
};
export default (axios, http);
