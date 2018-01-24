import EmissionPathwaysTableMenu from 'components/emission-pathways/emission-pathways-table-menu';
import EmissionPathwayGraph from 'components/emission-pathways/emission-pathway-graph';

export default [
  {
    hash: 'overview',
    label: 'Overview',
    anchor: true,
    component: EmissionPathwayGraph
  },
  {
    hash: 'models-scenarios-indicators',
    label: 'Models, Scenarios & Indicators',
    anchor: true,
    component: EmissionPathwaysTableMenu
  }
];
