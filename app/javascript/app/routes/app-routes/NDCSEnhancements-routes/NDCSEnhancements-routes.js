import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCSEnhancementsMap from 'components/ndcs/ndcs-enhancements-map';

export default [
  {
    path: '/ndcs-enhancements',
    component: NDCSEnhancementsMap,
    exact: true,
    anchor: true,
    label: 'Map'
  }
];
