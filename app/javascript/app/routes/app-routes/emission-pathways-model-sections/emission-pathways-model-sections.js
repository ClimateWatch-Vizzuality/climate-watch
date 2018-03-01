import { createElement } from 'react';

import EmissionPathwaysOverview from 'components/emission-pathways/emission-pathways-overview';
import EmissionPathwaysTableMenu from 'components/emission-pathways/emission-pathways-table-menu';

export default [
  {
    hash: 'overview',
    label: 'Overview',
    anchor: true,
    component: () =>
      createElement(EmissionPathwaysOverview, {
        category: 'Models'
      })
  },
  {
    hash: 'scenarios',
    label: 'Scenarios',
    anchor: true,
    nav: true,
    component: props =>
      createElement(EmissionPathwaysTableMenu, {
        routeLinks: props.routeLinks,
        uploadButton: true
      })
  }
];
