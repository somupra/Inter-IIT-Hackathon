import AsyncStorage from 'react-native';
import axios from 'axios';
import { Toast } from 'native-base';
import qs from 'qs';
// import fetch from 'fetch';

export const getKey = async () => {
  try {
    const value = await AsyncStorage.getItem('SRLMS_KEY');
    console.log(value);
    return value;
  } catch (error) {
    // Error retrieving data
  }
};

export const setKey = async key => {
  try {
    await AsyncStorage.setItem('SRLMS_KEY', key);
  } catch (error) {
    // Error saving data
  }
};

export const toast = async text => {
  Toast.show({
    text,
    duration: 3000
  });
};

const encode = params => {
  var query = '';
  for (key in params) {
    query +=
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
  }
  return query;
};

const BASE_URL = 'http://192.168.43.46:8000';

export const fetchData = async (method, url, rawData, nonAuthorized) => {
  const headers = nonAuthorized
    ? { 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json', Authorization: `Token ${key}` };
  const data = JSON.stringify(rawData);

  return fetch(BASE_URL + url, {
    method: method,
    headers: headers,
    body: data
  });
};
