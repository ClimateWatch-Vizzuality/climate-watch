import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import CompareAccordion from 'components/custom-compare-accordion';

export default [
  {
    path: '/custom-compare/overview',
    component: ({ targets }) =>
      createElement(CompareAccordion, {
        category: 'overview',
        compare: true,
        targets
      }),
    exact: true,
    anchor: true,
    label: 'Overview',
    param: 'overview'
  },
  {
    path: '/custom-compare/mitigation',
    component: ({ targets }) =>
      createElement(CompareAccordion, {
        category: 'mitigation',
        compare: true,
        targets
      }),
    exact: true,
    anchor: true,
    label: 'Mitigation',
    param: 'mitigation'
  },
  {
    path: '/custom-compare/adaptation',
    component: ({ targets }) =>
      createElement(CompareAccordion, {
        category: 'adaptation',
        compare: true,
        targets
      }),
    exact: true,
    anchor: true,
    label: 'Adaptation',
    param: 'adaptation'
  },
  {
    path: '/custom-compare/sectoral-information',
    component: ({ targets }) =>
      createElement(CompareAccordion, {
        category: 'sectoral_information',
        compare: true,
        targets
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
