import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import AboutContact from 'components/about/about-contact';
import AboutDescription from 'components/about/about-description';
import AboutPartners from 'components/about/about-partners';
import AboutPermissions from 'components/about/about-permissions';
import AboutFaq from 'components/about/about-faq';

export default [
  {
    path: '/about',
    component: AboutDescription,
    exact: true,
    anchor: true,
    label: 'About Climate Watch'
  },
  {
    path: '/about/partners',
    component: AboutPartners,
    exact: true,
    anchor: true,
    label: 'Climate Watch Partners'
  },
  {
    path: '/about/contact',
    component: AboutContact,
    exact: true,
    anchor: true,
    label: 'Contact Us & Feedback'
  },
  {
    path: '/about/permissions',
    component: AboutPermissions,
    exact: true,
    anchor: true,
    label: 'Permissions & Licensing'
  },
  {
    path: '/about/faq/general_questions',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'general_questions'
      }),
    anchor: false
  },
  {
    path: '/about/faq/ghg',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'ghg'
      }),
    anchor: false
  },
  {
    path: '/about/faq/ndc',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'ndc'
      }),
    anchor: false
  },
  {
    path: '/about/faq/ndc_sdg',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'ndc_sdg'
      }),
    anchor: false
  },
  {
    path: '/about/faq/pathways',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'pathways'
      }),
    anchor: false
  },
  {
    path: '/about/faq/countries',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'countries'
      }),
    anchor: false
  },
  {
    path: '/about/faq/my_climate_watch',
    component: () =>
      createElement(AboutFaq, {
        selectedSectionSlug: 'my_climate_watch'
      }),
    anchor: false
  },
  {
    path: '/about/faq/:section',
    exact: false,
    anchor: true,
    label: 'FAQ',
    component: () => createElement(Redirect, { to: '/about/faq/general_questions' })
  }
];
