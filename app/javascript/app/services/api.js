import isFunction from 'lodash/isFunction';
import { setup } from 'axios-cache-adapter';
// axios-cache-adapter needs to be fixed to 2.4.1 to avoid a IE problem

const { ESP_API } = process.env;
const { CW_API } = process.env;

const mockUrl = (endpoint, params) =>
  `/mocks/${endpoint}.json${params ? `?${params}` : ''}`;

const handleResponse = d => {
  if (d.status >= 200 && d.status <= 300) {
    const data = isFunction(d.json) ? d.json() : d;
    // fallback
    data.json = () => data;
    return data;
  }
  throw new Error(d.statusText);
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

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it
export const apiWithCache = setup({
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: { query: false }
  }
});
