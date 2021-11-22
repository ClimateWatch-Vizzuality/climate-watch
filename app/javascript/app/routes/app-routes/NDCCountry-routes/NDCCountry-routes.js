import { createElement } from 'react';
import { Redirect } from 'react-router-dom';
import { CATEGORY_SLUGS } from 'data/constants';

import CountryNdcOverview from 'components/country/country-ndc-overview';
import NDCCountryAccordion from 'components/ndcs/ndcs-country-accordion';

export default [
  {
    path: '/ndcs/country/:iso',
    component: () => createElement(CountryNdcOverview, { textColumns: true }),
    exact: true,
    anchor: true,
    label: 'Summary'
  },
  {
    path: '/ndcs/country/:iso/overview',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'overview',
        defaultSection: CATEGORY_SLUGS.commitmentSummary
      }),
    exact: true,
    anchor: true,
    label: 'Overview',
    param: 'overview'
  },
  {
    path: '/ndcs/country/:iso/mitigation',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'mitigation'
      }),
    exact: true,
    anchor: true,
    label: 'Mitigation',
    param: 'mitigation'
  },
  {
    path: '/ndcs/country/:iso/adaptation',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'adaptation'
      }),
    exact: true,
    anchor: true,
    label: 'Adaptation',
    param: 'adaptation'
  },
  {
    path: '/ndcs/country/:iso/sectoral-information',
    component: () =>
      createElement(NDCCountryAccordion, {
        category: 'sectoral_information'
      }),
    exact: true,
    anchor: true,
    label: 'Sectoral Information',
    param: 'sectoral-information'
  },
  {
    path: '/ndcs/country/:iso',
    component: () => createElement(Redirect, { to: '/ndcs' })
  }
];
