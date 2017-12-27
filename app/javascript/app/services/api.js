import isFunction from 'lodash/isFunction';

const { ESP_API } = process.env;

const mockUrl = (endpoint, params) =>
  `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

const api = (baseURL = '', version = 'v1') => ({
  get: (endpoint, params, mock = false) => {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${baseURL}/api/${version}/${endpoint}${params ? `?${params}` : ''}`;
    return fetch(url, {
      credentials: 'same-origin'
    }).then(d => {
      const data = isFunction(d.json) ? d.json() : d;
      // fallback
      data.json = () => data;
      return data;
    });
  },
  post: (endpoint, params, mock = false) => {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${baseURL}/api/${version}/${endpoint}`;
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(params)
    }).then(d => {
      const data = isFunction(d.json) ? d.json() : d;
      // fallback
      data.json = () => data;
      return data;
    });
  }
});

export const EPAPI = api(ESP_API);

export const CWAPI = api();
