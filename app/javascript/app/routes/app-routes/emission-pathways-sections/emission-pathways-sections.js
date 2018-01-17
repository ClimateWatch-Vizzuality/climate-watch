import EmissionPathwaysTableMenu from 'components/emission-pathways/emission-pathways-table-menu';
import EmissionPathwaysGraph from 'components/emission-pathways/emission-pathways-graph';

export default [
  {
    hash: 'overview',
    label: 'Overview',
    anchor: true,
    component: EmissionPathwaysGraph
  },
  {
    hash: 'models-scenarios-indicators',
    label: 'Models, Scenarios & Indicators',
    anchor: true,
    component: EmissionPathwaysTableMenu
  }
];
