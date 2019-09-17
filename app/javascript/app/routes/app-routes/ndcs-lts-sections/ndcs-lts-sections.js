import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCSLTSViz from 'components/ndcs/ndcs-lts-viz';
import NDCSLTSTable from 'components/ndcs/ndcs-lts-table';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: NDCSLTSViz
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NDCSLTSTable
  }
];
