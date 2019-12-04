import isEmpty from 'lodash/isEmpty';

const activeId = 'ndc';
const FEATURE_LTS_EXPLORE = process.env.FEATURE_LTS_EXPLORE === 'true';
export default [
  {
    path: '/ndcs-content',
    label: 'NDC Content',
    activeId
  },
  {
    path: '/2020-ndc-tracker',
    label: '2020 NDC Tracker',
    activeId
  },
  FEATURE_LTS_EXPLORE && {
    path: '/lts-explore',
    label: 'Explore LTS',
    activeId
  },
  FEATURE_LTS_EXPLORE && {
    path: '/ndcs-explore',
    label: 'Explore NDCS',
    activeId
  },
  {
    path: '/lts-tracker',
    label: 'Long-Term Strategy Tracker',
    activeId
  },
  {
    path: '/ndcs/compare/mitigation',
    label: 'NDC Comparison',
    activeId
  },
  {
    path: '/ndc-search',
    label: 'NDC Search',
    activeId
  },
  {
    path: '/ndcs-sdg',
    label: 'NDC-SDG LINKAGES',
    activeId
  }
].filter(o => !isEmpty(o));
