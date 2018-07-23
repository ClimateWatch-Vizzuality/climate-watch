import CompareSocioeconomics from 'components/compare/compare-socioeconomics';
import CompareGHGChart from 'components/compare/compare-ghg-chart';
import CompareNDCContentOverview from 'components/compare/compare-ndc-content-overview';
import ClimateVulnerability from 'components/country/country-climate-vulnerability';

export default [
  {
    hash: 'socio-economic-indicators',
    label: 'Socioeconomic Indicators',
    anchor: true,
    component: CompareSocioeconomics
  },
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
    excludeFromContained: true,
    component: ClimateVulnerability
  },
  {
    hash: 'ndc-content-overview',
    label: 'NDC Content Overview',
    anchor: true,
    component: CompareNDCContentOverview
  }
];
