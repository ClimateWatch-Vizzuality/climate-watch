import NDCSExploreMap from 'components/ndcs/ndcs-explore-map';
import NDCSExploreTable from 'components/ndcs/ndcs-explore-table';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: NDCSExploreMap
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NDCSExploreTable
  }
];
