import { createElement } from 'react';

import EmissionPathwaysScenarioTable from 'components/emission-pathways/emission-pathways-scenario-table';
import EmissionPathwaysOverview from 'components/emission-pathways/emission-pathways-overview';

export default [
  {
    hash: 'overview',
    label: 'Overview',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysOverview, {
        category: 'Scenarios'
      })
  },
  {
    hash: 'indicators',
    label: 'Indicators',
    anchor: true,
    nav: true,
    component: EmissionPathwaysScenarioTable
  }
];
