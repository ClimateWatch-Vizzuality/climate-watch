import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import Root from 'layouts/root';
import App from 'layouts/app';
import Embed from 'layouts/embed';
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
import GhgEmissionsGraph from 'components/ghg-emissions';
import EmissionPathways from 'pages/emission-pathways';
import EmissionPathwaysTable from 'components/emission-pathways-table';
import EmissionPathwaysTableMenu from 'components/emission-pathways-table-menu';
import EmissionPathwayGraph from 'components/emission-pathway-graph';
import EmissionPathwaysModel from 'pages/emission-pathways-model';
import EmissionPathwaysModelTable from 'components/emission-pathways-model-table';
import EmissionPathwaysScenario from 'pages/emission-pathways-scenario';
import EmissionPathwaysScenarioTable from 'components/emission-pathways-scenario-table';
import EmissionPathwaysOverview from 'components/emission-pathways-overview';
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
        component: Embed,
        path: '/embed',
        routes: [
          {
            path: '/embed/ndcs',
            component: NDCMap,
            exact: true
          },
          {
            path: '/embed/ghg-emissions',
            component: GhgEmissionsGraph,
            exact: true
          },
          {
            path: '/embed/countries/:iso/ghg-emissions',
            component: GHGCountryEmissions,
            exact: true
          },
          {
            path: '/embed/emission-pathways/',
            component: EmissionPathwayGraph,
            exact: true
          },
          {
            path: '/',
            component: () => createElement(Redirect, { to: '/' })
          }
        ]
      },
      {
        component: App,
        path: '/',
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
                component: () =>
                  createElement(CountryNdcOverview, { textColumns: true }),
                exact: true,
                anchor: true,
                label: 'Overview'
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
                component: () =>
                  createElement(Redirect, { to: '/ndcs/compare/mitigation' })
              }
            ]
          },
          {
            label: 'NDCs',
            nav: true,
            routes: [
              {
                path: '/ndcs',
                label: 'NDC Content'
              },
              {
                path: '/ndcs-sdg',
                label: 'NDC-SDG LINKAGES'
              }
            ]
          },
          {
            label: 'GHG EMISSIONS',
            nav: true,
            routes: [
              {
                path: '/ghg-emissions',
                label: 'GHG EMISSIONS'
              },
              {
                path: '/emission-pathways',
                label: 'EMISSION PATHWAYS'
              }
            ]
          },
          {
            path: '/ndcs',
            component: NDCS,
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
            label: 'GHG EMISSIONS',
            headerImage: 'emissions'
          },
          {
            path: '/emission-pathways',
            component: EmissionPathways,
            label: 'EMISSION PATHWAYS',
            headerImage: 'emission-pathways',
            sections: [
              {
                hash: 'overview',
                label: 'Overview',
                anchor: true,
                component: EmissionPathwayGraph
              },
              {
                hash: 'models-scenarios-indicators',
                label: 'Models, Scenarios & Indicators',
                anchor: true,
                component: EmissionPathwaysTableMenu
              }
            ],
            routes: [
              {
                path: '/emission-pathways/models',
                label: 'Models',
                anchor: true,
                component: () =>
                  createElement(EmissionPathwaysTable, {
                    category: 'Models'
                  })
              },
              {
                path: '/emission-pathways/scenarios',
                label: 'Scenarios',
                anchor: true,
                component: () =>
                  createElement(EmissionPathwaysTable, {
                    category: 'Scenarios'
                  })
              },
              {
                path: '/emission-pathways/indicators',
                label: 'Indicators',
                anchor: true,
                component: () =>
                  createElement(EmissionPathwaysTable, {
                    category: 'Indicators'
                  })
              },
              {
                path: '/emission-pathways',
                label: 'emission-pathways',
                exact: true,
                component: () =>
                  createElement(Redirect, { to: '/emission-pathways/models' })
              }
            ]
          },
          {
            path: '/emission-pathways/models/:id',
            component: EmissionPathwaysModel,
            label: 'EMISSION PATHWAYS MODEL',
            headerImage: 'emission-pathways',
            sections: [
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
                hash: 'scenarios-indicators',
                label: 'Scenarios & Indicators',
                anchor: true,
                nav: true,
                component: EmissionPathwaysTableMenu
              }
            ],
            routes: [
              {
                path: '/emission-pathways/models/:id/scenarios',
                label: 'Scenarios',
                anchor: true,
                component: () =>
                  createElement(EmissionPathwaysModelTable, {
                    category: 'Scenarios'
                  })
              },
              {
                path: '/emission-pathways/models/:id/indicators',
                label: 'Indicators',
                anchor: true,
                component: () =>
                  createElement(EmissionPathwaysModelTable, {
                    category: 'Indicators'
                  })
              },
              {
                path: '/emission-pathways/models/:id',
                label: 'emission-pathways-model',
                exact: true,
                component: ({ match }) =>
                  createElement(Redirect, {
                    to: `/emission-pathways/models/${match.params.id}/scenarios`
                  })
              }
            ]
          },
          {
            path: '/emission-pathways/scenarios/:id',
            component: EmissionPathwaysScenario,
            label: 'EMISSION PATHWAYS SCENARIO',
            headerImage: 'emission-pathways',
            sections: [
              {
                hash: 'indicators',
                label: 'Indicators',
                anchor: true,
                nav: true,
                component: EmissionPathwaysScenarioTable
              }
            ]
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
        label: 'GHG EMISSIONS',
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
    ]
  }
];
