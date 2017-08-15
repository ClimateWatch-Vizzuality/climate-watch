import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';

import Dropdown from 'components/dropdown';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Search from 'components/search';

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
      <Search placeholder="e.g. “Brazil”, “energy”, “reduce emissions by 37%”" />
      <AnchorNav links={ANCHOR_LINKS} />
    </Header>
    <h1>Other</h1>
    <button onClick={() => fetchMeData('payloadsss')}>Fetchers</button>
    <p>
      {loading ? 'loading...' : ''}
      {loaded ? `data: ${data}` : 'no data'}
    </p>
    <Dropdown
      name="form-field-name"
      value={'test'}
      options={[
        {
          label: 'test',
          value: 'test'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ]}
    />
  </div>);

Other.propTypes = {
  fetchMeData: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  data: PropTypes.object
};

export default Other;
