import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

export const getApiAccesToken = (request: any, timestamp: string) => {
  const path = getPathFromUrl(request.urlWithParams);
  const body = request.body ? request.body : '';
  const bodylength =  request.body ? JSON.stringify(body).length : 0;
  let cryptedbody;
  if (bodylength == 0) {
    cryptedbody = CryptoJS.MD5(body).toString();
  } else {
    cryptedbody = CryptoJS.MD5(JSON.stringify(body)).toString();
  }
  const token = path + request.method + bodylength + cryptedbody + timestamp;
  const encryptedToken = CryptoJS.HmacSHA512(token, environment.apiKey).toString();
  return encryptedToken;
}

const getPathFromUrl = (url: string) => {
  const urlSplited = url.split('/');
  let indexOfPathBegin = 0;
  urlSplited.forEach((item, index) => {
    if (item.includes('admin')) {
      indexOfPathBegin = index;
    } else if (item.includes('api')) {
      indexOfPathBegin = index;
    }
  });
  let path = '';
  for (let i = indexOfPathBegin; i < urlSplited.length; i++) {
    path += '/' + urlSplited[i];
  }
  return path
}
