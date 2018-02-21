import CompareGHGChart from 'components/compare-ghg-chart';
import ClimateVulnerability from 'components/country/country-climate-vulnerability';

export default [
  {
    hash: 'ghg-emissions',
    label: 'GHG Emissions',
    anchor: true,
    component: CompareGHGChart
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
