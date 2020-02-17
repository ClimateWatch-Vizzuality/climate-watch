import isEmpty from 'lodash/isEmpty';

const activeId = 'ndc';
const FEATURE_LTS_EXPLORE = process.env.FEATURE_LTS_EXPLORE === 'true';
const FEATURE_COMMITMENTS_OVERVIEW =
  process.env.FEATURE_COMMITMENTS_OVERVIEW === 'true';
const FEATURE_ALL_COMMITMENTS_MENU_ITEMS =
  process.env.FEATURE_ALL_COMMITMENTS_MENU_ITEMS === 'true';

export default [
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || FEATURE_COMMITMENTS_OVERVIEW) && {
    path: '/ndc-overview',
    label: 'Overview',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || !FEATURE_LTS_EXPLORE) && {
    path: '/ndcs-content',
    label: 'NDC Content',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || !FEATURE_LTS_EXPLORE) && {
    path: '/2020-ndc-tracker',
    label: '2020 NDC Tracker',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || FEATURE_LTS_EXPLORE) && {
    path: '/ndcs-explore',
    label: 'Explore NDCS',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || FEATURE_LTS_EXPLORE) && {
    path: '/lts-explore',
    label: 'Explore LTS',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || !FEATURE_LTS_EXPLORE) && {
    path: '/lts-tracker',
    label: 'Long-Term Strategy Tracker',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || !FEATURE_LTS_EXPLORE) && {
    path: '/ndcs/compare',
    label: 'NDC Comparison',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || !FEATURE_LTS_EXPLORE) && {
    path: '/ndc-search',
    label: 'NDC Search',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || FEATURE_COMMITMENTS_OVERVIEW) && {
    path: '/custom-compare',
    label: 'Custom compare',
    activeId
  },
  {
    path: '/ndcs-sdg',
    label: 'EXPLORE NDC-SDG LINKAGES',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || FEATURE_COMMITMENTS_OVERVIEW) && {
    path: '/compare-all-targets',
    label: 'COMPARE ALL TARGETS',
    activeId
  }
].filter(o => !isEmpty(o));
