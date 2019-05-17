import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCSEnhancementsMap from 'components/ndcs/ndcs-enhancements-map';
import NDCSEnhancementsTable from 'components/ndcs/ndcs-enhancements-table';

export default [
  {
    path: '/ndcs-enhancements',
    component: NDCSEnhancementsMap,
    exact: true,
    anchor: true,
    label: 'Map'
  },
  {
    path: '/ndcs-enhancements/table',
    component: NDCSEnhancementsTable,
    exact: true,
    anchor: true,
    label: 'Table'
  }
];
