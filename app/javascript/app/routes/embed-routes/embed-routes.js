import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCMap from 'components/ndcs/ndcs-map';
import GhgEmissionsGraph from 'components/ghg-emissions';
import CompareGhgChart from 'components/compare/compare-ghg-chart';
import CountryGhg from 'components/country/country-ghg';
import CountryNdcOverview from 'components/country/country-ndc-overview';
import NDCSDGLinkages from 'components/country/country-ndc-sdg-linkages';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import EmissionPathwaysGraph from 'components/emission-pathways/emission-pathways-graph';
import MyVisualisationsGraphComponent from 'components/my-climate-watch/my-visualisations/my-cw-vis-graph';

export default [
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
    path: '/embed/compare-ghg-chart',
    component: CompareGhgChart,
    exact: true
  },
  {
    path: '/embed/countries/:iso/ghg-emissions',
    component: CountryGhg,
    exact: true
  },
  {
    path: '/embed/countries/:iso/ndc-content-overview',
    component: CountryNdcOverview,
    exact: true
  },
  {
    path: '/embed/countries/:iso/ndc-sdg-linkages',
    component: NDCSDGLinkages,
    exact: true
  },
  {
    path: '/embed/ndcs-sdg',
    component: NdcSdgLinkagesContent,
    exact: true
  },
  {
    path: '/embed/pathways',
    component: EmissionPathwaysGraph,
    exact: true
  },
  {
    path: '/embed/my-visualizations/:id',
    component: MyVisualisationsGraphComponent,
    exact: true
  },
  {
    path: '/',
    component: () => createElement(Redirect, { to: '/' })
  }
];
