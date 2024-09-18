import NDCSEnhancementsMap from 'components/ndcs/ndcs-enhancements-map';
import NDCSEnhancements2025Table from 'components/ndcs/ndcs-enhancements-2025-table';

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
    component: NDCSEnhancements2025Table
  }
];
