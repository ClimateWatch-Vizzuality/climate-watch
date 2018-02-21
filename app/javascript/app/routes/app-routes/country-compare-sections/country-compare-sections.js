import CompareGHGChart from 'components/compare-ghg-chart';
import CompareNDCContentOverview from 'components/compare-ndc-content-overview';

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
    anchor: true
  },
  {
    hash: 'ndc-content-overview',
    label: 'NDC Content Overview',
    anchor: true,
    component: CompareNDCContentOverview
  }
];
