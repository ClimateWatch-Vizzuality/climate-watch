import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import CountryLtsOverview from 'components/country/country-lts-overview';
import NDCCountryAccordion from 'components/ndcs/ndcs-country-accordion';

export default [
  {
    path: '/lts/country/:iso',
    component: () => createElement(CountryLtsOverview, { textColumns: true }),
    exact: true,
    anchor: true,
    label: 'Summary'
  },
  {
    path: '/lts/country/:iso/overview',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'overview',
        lts: true
      }),
    exact: true,
    anchor: true,
    label: 'Overview',
    param: 'overview'
  },
  {
    path: '/lts/country/:iso/mitigation',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'mitigation',
        lts: true
      }),
    exact: true,
    anchor: true,
    label: 'Mitigation',
    param: 'mitigation'
  },
  {
    path: '/lts/country/:iso/adaptation',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'adaptation',
        lts: true
      }),
    exact: true,
    anchor: true,
    label: 'Adaptation',
    param: 'adaptation'
  },
  {
    path: '/lts/country/:iso',
    component: ({ match }) =>
      createElement(Redirect, {
        to: `/lts/country/${match.params.iso}`
      })
  }
];
