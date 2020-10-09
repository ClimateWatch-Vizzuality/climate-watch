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
  }
].filter(o => !isEmpty(o));
