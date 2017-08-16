import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';

import Dropdown from 'components/dropdown';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Search from 'components/search';
import ResultsList from 'components/results-list';
import Accordion from 'components/accordion';

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

const Other = ({
  fetchMeData,
  loading,
  loaded,
  data,
  searchList,
  search,
  setSearch
}) =>
  (<div>
    <Header>
      <Intro title="NDC Explorer" />
      <Search
        placeholder="e.g. “Brazil”, “energy”, “reduce emissions by 37%”"
        input={search}
        onChange={setSearch}
      />
      <ResultsList search={search} list={searchList} hasIcon />
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
    <Accordion>
      <div>hello</div>
    </Accordion>
  </div>);

Other.propTypes = {
  fetchMeData: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  data: PropTypes.object,
  searchList: PropTypes.array,
  search: PropTypes.string,
  setSearch: PropTypes.func
};

export default Other;
