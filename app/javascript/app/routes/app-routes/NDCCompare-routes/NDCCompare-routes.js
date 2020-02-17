import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCCountryAccordion from 'components/ndcs/ndcs-country-accordion';

export default [
  {
    path: '/ndcs/compare/overview',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'overview',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Overview',
    param: 'overview'
  },
  {
    path: '/ndcs/compare/mitigation',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'mitigation',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Mitigation',
    param: 'mitigation'
  },
  {
    path: '/ndcs/compare/adaptation',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'adaptation',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Adaptation',
    param: 'adaptation'
  },
  {
    path: '/ndcs/compare/sectoral-information',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'sectoral_information',
        compare: true
      }),
    exact: true,
    anchor: true,
    label: 'Sectoral Information',
    param: 'sectoral-information'
  },
  {
    path: '/ndcs/compare',
    component: () => createElement(Redirect, { to: '/ndcs/compare/overview' })
  }
];
