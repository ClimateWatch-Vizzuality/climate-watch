import LTSExploreMap from 'components/ndcs/lts-explore-map';
import LTSExploreTable from 'components/ndcs/lts-explore-table';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: LTSExploreMap
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: LTSExploreTable
  }
];
