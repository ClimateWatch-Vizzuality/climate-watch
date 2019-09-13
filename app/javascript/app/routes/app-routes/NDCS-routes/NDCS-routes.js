const activeId = 'ndc';
const FEATURE_NDCS_ENHANCEMENTS =
  process.env.FEATURE_NDCS_ENHANCEMENTS === 'true';
const FEATURE_NDCS_LTS = process.env.FEATURE_NDCS_LTS === 'true';
let routes = [
  {
    path: '/ndcs-content',
    label: 'NDC Content',
    activeId
  }
]
  
FEATURE_NDCS_ENHANCEMENTS && routes.push({
  path: '/ndcs-enhancements',
  label: '2020 NDC Tracker',
  activeId
})
FEATURE_NDCS_LTS && routes.push({
  path: '/ndcs-lts',
  label: 'Long-Term Strategy Tracker',
  activeId
})

routes.push(
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
)

export default routes;
