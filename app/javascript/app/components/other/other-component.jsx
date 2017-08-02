import React from 'react'

const Other = ({ fetchMeData }) => (
  <div>
    <h1>Other</h1>
    <button onClick={() => fetchMeData('payloadsss')}>Fetchers</button>
  </div>
)
export default Other
