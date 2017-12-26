import isFunction from 'lodash/isFunction';

const mockUrl = (endpoint, params) =>
  `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

const API = (baseURL = '', version = 'v1') => ({
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
  }
});

export const EPAPI = API('https://data.emissionspathways.org');

export const CWAPI = API();
