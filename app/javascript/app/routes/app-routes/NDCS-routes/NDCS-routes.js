import isEmpty from 'lodash/isEmpty';

const activeId = 'ndc';

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
    label: 'NDC Enhancement Tracker',
    activeId
  },
  {
    path: '/2025-ndc-tracker',
    label: 'NDC Tracker',
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
    activeId,
    tour: 'compare-all'
  },
  {
    path: '/net-zero-tracker',
    label: 'NET-ZERO TRACKER',
    activeId
  }
].filter(o => !isEmpty(o));
