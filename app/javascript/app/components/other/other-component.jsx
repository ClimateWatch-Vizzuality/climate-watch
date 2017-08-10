import React from 'react';
import Header from 'components/header';

const Other = ({ fetchMeData, loading, loaded, data }) =>
  (<div>
    <Header />
    <h1>Other</h1>
    <button onClick={() => fetchMeData('payloadsss')}>Fetchers</button>
    <p>
      {loading ? 'loading...' : loaded ? `data: ${data}` : 'no data'}
    </p>
  </div>);
export default Other;
