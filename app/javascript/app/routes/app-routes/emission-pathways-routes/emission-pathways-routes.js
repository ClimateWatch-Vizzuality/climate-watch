import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import EmissionPathwaysTable from 'components/emission-pathways/emission-pathways-table';

export default [
  {
    path: '/pathways/models',
    label: 'Models',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysTable, {
        category: 'Models'
      })
  },
  {
    path: '/pathways/scenarios',
    label: 'Scenarios',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysTable, {
        category: 'Scenarios'
      })
  },
  {
    path: '/pathways/indicators',
    label: 'Indicators',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysTable, {
        category: 'Indicators'
      })
  },
  {
    path: '/pathways',
    label: 'Pathways',
    exact: true,
    component: () => createElement(Redirect, { to: '/pathways/models' })
  }
];
