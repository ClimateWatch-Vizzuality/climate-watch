import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCMap from 'components/ndcs/ndcs-map';
import NDCTable from 'components/ndcs/ndcs-table';

export default [
  {
    path: '/ndcs-content',
    component: NDCMap,
    exact: true,
    anchor: true,
    label: 'Map'
  },
  {
    path: '/ndcs-content/table',
    component: NDCTable,
    exact: true,
    anchor: true,
    label: 'Table'
  },
  {
    path: '/ndcs',
    component: () => createElement(Redirect, { to: '/ndcs-content' })
  }
];
