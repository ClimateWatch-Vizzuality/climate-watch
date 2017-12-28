import isFunction from 'lodash/isFunction';

const { ESP_API } = process.env;
const { CW_API } = process.env;

const mockUrl = (endpoint, params) =>
  `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

const baseConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

const handleResponse = d => {
  const data = isFunction(d.json) ? d.json() : d;
  // fallback
  data.json = () => data;
  return data;
};

const api = (baseURL = '') => ({
  get: (endpoint, params, mock = false) => {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${baseURL}/${endpoint}${params ? `?${params}` : ''}`;
    return fetch(url, baseConfig).then(handleResponse);
  },
  post: (endpoint, params, mock = false) => {
    const url = mock ? mockUrl(endpoint, params) : `${baseURL}/${endpoint}`;
    return fetch(url, {
      ...baseConfig,
      method: 'POST',
      body: JSON.stringify(params)
    }).then(handleResponse);
  },
  patch: (endpoint, params, mock = false) => {
    const url = mock ? mockUrl(endpoint, params) : `${baseURL}/${endpoint}`;
    return fetch(url, {
      ...baseConfig,
      method: 'PATCH',
      body: JSON.stringify(params)
    }).then(handleResponse);
  }
});

export const EPAPI = api(ESP_API);

export const CWAPI = api(CW_API);
