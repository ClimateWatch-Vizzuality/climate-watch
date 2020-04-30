import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import CompareAccordion from 'components/custom-compare-accordion';

export default [
  {
    path: '/custom-compare/overview',
    component: () =>
      createElement(CompareAccordion, {
        category: 'overview',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Overview',
    param: 'overview'
  },
  {
    path: '/custom-compare/mitigation',
    component: () =>
      createElement(CompareAccordion, {
        category: 'mitigation',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Mitigation',
    param: 'mitigation'
  },
  {
    path: '/custom-compare/adaptation',
    component: () =>
      createElement(CompareAccordion, {
        category: 'adaptation',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Adaptation',
    param: 'adaptation'
  },
  {
    path: '/custom-compare/sectoral-information',
    component: () =>
      createElement(CompareAccordion, {
        category: 'sectoral_information',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Sectoral Information',
    param: 'sectoral-information'
  },
  {
    path: '/custom-compare',
    component: () => createElement(Redirect, { to: '/custom-compare/overview' })
  }
];
