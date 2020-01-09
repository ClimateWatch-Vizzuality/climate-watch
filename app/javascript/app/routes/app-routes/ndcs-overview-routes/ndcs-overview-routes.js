import { createElement } from 'react';
import NDCOverviewSection from 'components/ndcs/ndcs-overview-section';

export default [
  {
    label: 'ndc-overview-1',
    path: '/ndc-overview/1',
    exact: true,
    component: () =>
      createElement(NDCOverviewSection, {
        section: '1'
      })
  },
  {
    label: 'ndc-overview-2',
    path: '/ndc-overview/2',
    exact: true,
    component: () =>
      createElement(NDCOverviewSection, {
        section: '2'
      })
  },
  {
    label: 'ndc-overview-3',
    path: '/ndc-overview/3',
    exact: true,
    component: () =>
      createElement(NDCOverviewSection, {
        section: '3'
      })
  },
  {
    label: 'ndc-overview',
    path: '/ndc-overview',
    component: NDCOverviewSection
  }
];
