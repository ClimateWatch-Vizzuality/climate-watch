import NDCSEnhancementsMap from 'components/ndcs/ndcs-enhancements-map';
import NDCSEnhancementsTable from 'components/ndcs/ndcs-enhancements-table';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: NDCSEnhancementsMap
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NDCSEnhancementsTable
  }
];
