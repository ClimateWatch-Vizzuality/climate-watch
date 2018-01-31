import isFunction from 'lodash/isFunction';

const { ESP_API } = process.env;
const { CW_API } = process.env;

const mockUrl = (endpoint, params) =>
  `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

const handleResponse = d => {
  const data = isFunction(d.json) ? d.json() : d;
  // fallback
  data.json = () => data;
  return data;
};

class API {
  constructor(baseUrl, config) {
    this.config = { ...config };
    this.baseURL = baseUrl;
  }

  get(endpoint, params, mock = false) {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${this.baseURL}/${endpoint}${params ? `?${params}` : ''}`;
    return fetch(url, this.config).then(handleResponse);
  }

  post(endpoint, params, mock = false) {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${this.baseURL}/${endpoint}`;
    return fetch(url, {
      ...this.config,
      method: 'POST',
      body: JSON.stringify(params)
    }).then(handleResponse);
  }

  patch(endpoint, params, mock = false) {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${this.baseURL}/${endpoint}`;
    return fetch(url, {
      ...this.config,
      method: 'PATCH',
      body: JSON.stringify(params)
    }).then(handleResponse);
  }

  delete(endpoint, params, mock = false) {
    const url = mock
      ? mockUrl(endpoint, params)
      : `${this.baseURL}/${endpoint}`;
    return fetch(url, {
      ...this.config,
      method: 'DELETE'
    }).then(handleResponse);
  }
}

export const EPAPI = new API(ESP_API);

const cwConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

export const CWAPI = new API(CW_API, cwConfig);
