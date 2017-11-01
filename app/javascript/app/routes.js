import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import Root from 'app/pages/root';
import Home from 'pages/home';
import NDCS from 'pages/ndcs';
import NDCSDG from 'pages/ndc-sdg';
import NDCMap from 'components/ndcs-map';
import NDCTable from 'components/ndcs-table';
import NDCCountry from 'pages/ndc-country';
import NDCCountryFull from 'pages/ndc-country-full';
import NDCCountryAccordion from 'components/ndcs-country-accordion';
import NDCCompare from 'pages/ndc-compare';
import CountryIndex from 'pages/country-index';
import Country from 'pages/country';
import CountryCompare from 'pages/country-compare';
import Sectors from 'pages/sectors';
import CountryNdcOverview from 'components/country-ndc-overview';
import NDCSearch from 'pages/ndc-search';
import GHGEmissions from 'pages/ghg-emissions';
import EmissionPathways from 'pages/emission-pathways';
import About from 'pages/about';
import AboutContact from 'components/about-contact';
import AboutDescription from 'components/about-description';
import AboutPartners from 'components/about-partners';
import AboutPermissions from 'components/about-permissions';
import GHGCountryEmissions from 'components/country-ghg';
import NDCSDGLinkages from 'components/country-ndc-sdg-linkages';
import ClimateVulnerability from 'components/country-climate-vulnerability';
import error from 'pages/error';

export default [
  {
    component: Root,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        headerImage: 'home'
      },
      {
        path: '/countries',
        component: CountryIndex,
        exact: true,
        nav: true,
        label: 'COUNTRIES',
        headerImage: 'countries'
      },
      {
        path: '/countries/compare',
        component: CountryCompare,
        exact: true,
        headerImage: 'ndc'
      },
      {
        path: '/sectors',
        component: Sectors,
        exact: true,
        nav: true,
        label: 'SECTORS'
      },
      {
        path: '/ndcs/country/:iso/full',
        component: NDCCountryFull,
        exact: true,
        headerImage: 'ndc'
      },
      {
        path: '/ndcs/country/:iso',
        component: NDCCountry,
        headerImage: 'ndc',
        routes: [
          {
            path: '/ndcs/country/:iso',
            component: () => createElement(CountryNdcOverview),
            exact: true,
            anchor: true,
            label: 'Overview'
          },
          {
            path: '/ndcs/country/:iso/mitigation',
            component: () =>
              createElement(NDCCountryAccordion, {
                category: 'migitation',
                type: 'overview'
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
                category: 'adaptation',
                type: 'overview'
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
                category: 'sectoral_information',
                type: 'overview'
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
        ]
      },
      {
        path: '/ndcs/compare',
        component: NDCCompare,
        headerImage: 'ndc',
        routes: [
          {
            path: '/ndcs/compare/mitigation',
            component: () =>
              createElement(NDCCountryAccordion, {
                category: 'migitation',
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
            component: () =>
              createElement(Redirect, { to: '/ndcs/compare/mitigation' })
          }
        ]
      },
      {
        path: '/ndcs',
        component: NDCS,
        nav: true,
        label: 'NDCs',
        headerImage: 'ndc',
        routes: [
          {
            path: '/ndcs',
            component: NDCMap,
            exact: true,
            anchor: true,
            label: 'Map'
          },
          {
            path: '/ndcs/table',
            component: NDCTable,
            exact: true,
            anchor: true,
            label: 'Table'
          },
          {
            path: '/ndcs',
            component: () => createElement(Redirect, { to: '/ndcs' })
          }
        ]
      },
      {
        path: '/ndcs-sdg',
        component: NDCSDG,
        exact: true,
        nav: true,
        label: 'SDG LINKAGES',
        headerImage: 'ndc-sdg'
      },
      {
        path: '/countries/:iso',
        component: Country,
        headerImage: 'countries',
        sections: [
          {
            hash: 'ghg-emissions',
            label: 'GHG Emissions',
            anchor: true,
            component: GHGCountryEmissions
          },
          {
            hash: 'climate-vulnerability',
            label: 'Climate Vulnerability and Readiness',
            anchor: true,
            component: ClimateVulnerability
          },
          {
            hash: 'ndc-content-overview',
            label: 'NDC Content Overview',
            anchor: true,
            component: () =>
              createElement(CountryNdcOverview, { actions: true })
          },
          {
            hash: 'ndc-sdg-linkages',
            label: 'NDC-SDG Linkages',
            anchor: true,
            component: NDCSDGLinkages
          }
        ]
      },
      {
        path: '/ghg-emissions',
        component: GHGEmissions,
        exact: true,
        nav: true,
        label: 'GHG EMISSIONS',
        headerImage: 'emissions'
      },
      {
        path: '/emission-pathways',
        component: EmissionPathways,
        exact: true,
        nav: true,
        label: 'EMISSION PATHWAYS',
        headerImage: 'emissions'
      },
      {
        path: '/ndc-search',
        exact: true,
        component: NDCSearch,
        headerImage: 'ndc'
      },
      {
        path: '/stories',
        component: error,
        exact: true,
        nav: false,
        label: 'STORIES'
      },
      {
        path: '/about',
        component: About,
        nav: true,
        label: 'ABOUT',
        headerImage: 'about',
        routes: [
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
          }
        ]
      },
      {
        path: '/error-page',
        component: error
      },
      {
        path: '/',
        component: () => createElement(Redirect, { to: '/error-page' })
      }
    ]
  }
];
