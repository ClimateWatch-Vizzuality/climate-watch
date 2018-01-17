import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import EmissionPathwaysTable from 'components/emission-pathways/emission-pathways-table';

export default [
  {
    path: '/emission-pathways/models',
    label: 'Models',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysTable, {
        category: 'Models'
      })
  },
  {
    path: '/emission-pathways/scenarios',
    label: 'Scenarios',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysTable, {
        category: 'Scenarios'
      })
  },
  {
    path: '/emission-pathways/indicators',
    label: 'Indicators',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysTable, {
        category: 'Indicators'
      })
  },
  {
    path: '/emission-pathways',
    label: 'emission-pathways',
    exact: true,
    component: () =>
      createElement(Redirect, { to: '/emission-pathways/models' })
  }
];
