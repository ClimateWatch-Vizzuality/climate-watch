import { createElement } from 'react';
import EmissionPathwaysModelTable from 'components/emission-pathways/emission-pathways-model-table';

export default [
  {
    path: '/pathways/models/:id',
    label: 'Scenarios',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysModelTable, {
        category: 'Scenarios'
      })
  }
];
