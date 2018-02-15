import ClimateVulnerability from 'components/country-compare/country-compare-climate-vulnerability/country-compare-climate-vulnerability';

export default [
  {
    hash: 'ghg-emissions',
    label: 'GHG Emissions',
    anchor: true
  },
  {
    hash: 'climate-vulnerability',
    label: 'Climate Vulnerability and Readiness',
    anchor: true,
    component: ClimateVulnerability
  },
  {
    hash: 'ndc-content-overview',
    label: 'NDC Content Overview',
    anchor: true
  }
];
