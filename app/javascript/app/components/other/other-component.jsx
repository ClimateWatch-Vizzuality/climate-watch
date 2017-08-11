import React from 'react';
import Header from 'components/header';
import Dropdown from 'components/dropdown';

const Other = ({ fetchMeData, loading, loaded, data }) =>
  (<div>
    <Header />
    <h1>Other</h1>
    <button onClick={() => fetchMeData('payloadsss')}>Fetchers</button>
    <p>
      {loading ? 'loading...' : loaded ? `data: ${data}` : 'no data'}
    </p>
    <Dropdown
      name="form-field-name"
      value="one"
      options={[
        {
          label: 'test',
          value: 'test'
        }
      ]}
    />
  </div>);
export default Other;
