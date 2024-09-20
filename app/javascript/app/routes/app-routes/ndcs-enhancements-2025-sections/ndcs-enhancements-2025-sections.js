import NDCSEnhancements2025TrackerChart from 'components/ndcs/ndcs-enhancements-2025-tracker-chart';
import NDCSEnhancements2025Map from 'components/ndcs/ndcs-enhancements-2025-map';
import NDCSEnhancements2025Table from 'components/ndcs/ndcs-enhancements-2025-table';

export default [
  {
    hash: 'chart',
    anchor: false,
    label: 'Chart',
    component: NDCSEnhancements2025TrackerChart
  },
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: NDCSEnhancements2025Map
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NDCSEnhancements2025Table
  }
];
