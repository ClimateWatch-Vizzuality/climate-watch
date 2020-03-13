import { createElement } from 'react';
import DataExplorerContent from 'components/data-explorer-content';
import { Redirect } from 'react-router-dom';

export default [
  {
    label: 'Data Explorer',
    path: '/data-explorer',
    exact: true,
    component: () =>
      createElement(Redirect, { to: '/data-explorer/historical-emissions' })
  },
  {
    label: 'Historical Emissions',
    path: '/data-explorer/historical-emissions',
    component: () =>
      createElement(DataExplorerContent, {
        section: 'historical-emissions'
      }),
    anchor: true,
    exact: true
  },
  {
    label: 'Pathways',
    path: '/data-explorer/emission-pathways',
    component: () =>
      createElement(DataExplorerContent, {
        section: 'emission-pathways'
      }),
    anchor: true,
    exact: true
  },
  {
    label: 'NDC-SDG Linkages',
    path: '/data-explorer/ndc-sdg-linkages',
    component: () =>
      createElement(DataExplorerContent, {
        section: 'ndc-sdg-linkages'
      }),
    anchor: true,
    exact: true
  },
  {
    label: 'NDC Content',
    path: '/data-explorer/ndc-content',
    component: () =>
      createElement(DataExplorerContent, {
        section: 'ndc-content'
      }),
    anchor: true,
    exact: true
  },
  {
    label: 'LTS Content',
    path: '/data-explorer/lts-content',
    component: () =>
      createElement(DataExplorerContent, {
        section: 'lts-content'
      }),
    anchor: true,
    exact: true
  }
];
