import isEmpty from 'lodash/isEmpty';

const activeId = 'ndc';
const FEATURE_KEY_VISUALIZATIONS =
  process.env.FEATURE_KEY_VISUALIZATIONS === 'true';

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
  {
    path: '/ndcs-sdg',
    label: 'EXPLORE NDC-SDG LINKAGES',
    activeId
  },
  {
    path: '/compare-all-targets',
    label: 'COMPARE ALL TARGETS',
    activeId
  },
  FEATURE_KEY_VISUALIZATIONS && {
    path: '/key-visualizations',
    label: 'Key Visualizations',
    activeId
  },
  {
    path: '/net-zero-tracker',
    label: 'NET-ZERO TRACKER',
    activeId
  }
].filter(o => !isEmpty(o));
