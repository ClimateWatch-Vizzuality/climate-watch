import NetZeroMap from 'components/ndcs/net-zero-map';
import NetZeroTable from 'components/ndcs/net-zero-table';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: NetZeroMap
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NetZeroTable
  }
];
