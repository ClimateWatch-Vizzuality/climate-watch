import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';

const ANCHOR_LINKS = [
  {
    label: 'Map',
    path: '/ndcs'
  },
  {
    label: 'Table',
    path: '/ndcs/table'
  }
];

const Other = ({ fetchMeData, loading, loaded, data }) =>
  (<div>
    <Header>
      <Intro title="NDC Explorer" />
      <AnchorNav links={ANCHOR_LINKS} />
    </Header>
    <h1>Other</h1>
    <button onClick={() => fetchMeData('payloadsss')}>Fetchers</button>
    <p>
      {loading ? 'loading...' : ''}
      {loaded ? `data: ${data}` : 'no data'}
    </p>
  </div>);

Other.propTypes = {
  fetchMeData: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  data: PropTypes.object
};

export default Other;
