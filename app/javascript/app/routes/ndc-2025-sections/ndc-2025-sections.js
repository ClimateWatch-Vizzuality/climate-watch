import Net2025TrackerMap from 'components/ndcs/net-2025-tracker-map';
import NetZeroTable from 'components/ndcs/net-zero-table';
import Ndc2025TrackerChart from 'components/ndcs/ndc-2025-tracker-chart';

export default [
  {
    hash: 'chart',
    anchor: false,
    label: 'Chart',
    component: Ndc2025TrackerChart
  },
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: Net2025TrackerMap
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NetZeroTable
  }
];
