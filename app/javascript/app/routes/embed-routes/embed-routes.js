import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCMap from 'components/ndcs/ndcs-map';
import GhgEmissionsGraph from 'components/ghg-emissions';
import CompareGhgChart from 'components/compare-ghg-chart';
import CountryGhgEmissions from 'components/country/country-ghg-emissions';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import EmissionPathwaysGraph from 'components/emission-pathways/emission-pathways-graph';

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
    component: CountryGhgEmissions,
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
    path: '/',
    component: () => createElement(Redirect, { to: '/' })
  }
];
