import React from 'react';

const Other = ({ fetchMeData, loading, loaded, data }) =>
  (<div>
    <h1>Other</h1>
    <button onClick={() => fetchMeData('payloadsss')}>Fetchers</button>
    <p>
      {loading ? 'loading...' : loaded ? `data: ${data}` : 'no data'}
    </p>
  </div>);
export default Other;
