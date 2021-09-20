import NDCSEnhancementsViz from 'components/ndcs/ndcs-enhancements-viz';
import NDCSEnhancementsTable from 'components/ndcs/ndcs-enhancements-table';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: NDCSEnhancementsViz
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NDCSEnhancementsTable
  }
];
