import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import EmissionPathwaysModelTable from 'components/emission-pathways/emission-pathways-model-table';

export default [
  {
    path: '/emission-pathways/models/:id/scenarios',
    label: 'Scenarios',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysModelTable, {
        category: 'Scenarios'
      })
  },
  {
    path: '/emission-pathways/models/:id/indicators',
    label: 'Indicators',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysModelTable, {
        category: 'Indicators'
      })
  },
  {
    path: '/emission-pathways/models/:id',
    label: 'emission-pathways-model',
    exact: true,
    component: ({ match }) =>
      createElement(Redirect, {
        to: `/emission-pathways/models/${match.params.id}/scenarios`
      })
  }
];
