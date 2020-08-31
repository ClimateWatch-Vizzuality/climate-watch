import isEmpty from 'lodash/isEmpty';

const activeId = 'ndc';
const FEATURE_COMPARE_ALL = process.env.FEATURE_COMPARE_ALL === 'true';
const FEATURE_ALL_COMMITMENTS_MENU_ITEMS =
  process.env.FEATURE_ALL_COMMITMENTS_MENU_ITEMS === 'true';

export default [
  {
    path: '/ndc-overview',
    label: 'Overview',
    activeId
  },
  {
    path: '/ndcs-explore',
    label: 'Explore NDCS',
    activeId
  },
  {
    path: '/lts-explore',
    label: 'Explore LTS',
    activeId
  },
  {
    path: '/2020-ndc-tracker',
    label: '2020 NDC Tracker',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || !FEATURE_COMPARE_ALL) && {
    path: '/ndcs/compare',
    label: 'NDC Comparison',
    activeId
  },
  {
    path: '/ndcs-sdg',
    label: 'EXPLORE NDC-SDG LINKAGES',
    activeId
  },
  (FEATURE_ALL_COMMITMENTS_MENU_ITEMS || FEATURE_COMPARE_ALL) && {
    path: '/compare-all-targets',
    label: 'COMPARE ALL TARGETS',
    activeId
  }
].filter(o => !isEmpty(o));
