const activeId = 'ndc';
const FEATURE_NDCS_ENHANCEMENTS = process.env.FEATURE_NDCS_ENHANCEMENTS === 'true';
export default [
  {
    path: '/ndcs-content',
    label: 'NDC Content',
    activeId
  },
  FEATURE_NDCS_ENHANCEMENTS && {
    path: '/ndcs-enhancements',
    label: '2020 Ambition Tracker',
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
];
