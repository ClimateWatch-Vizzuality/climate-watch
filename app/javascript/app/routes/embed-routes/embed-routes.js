import { createElement } from 'react';
import { Redirect } from 'react-router-dom';

import NDCMap from 'components/ndcs/ndcs-map';
import NDCSEnhancementsViz from 'components/ndcs/ndcs-enhancements-viz';
import NDCSLTSViz from 'components/ndcs/ndcs-lts-viz';
import GhgEmissionsGraph from 'components/ghg-emissions';
import CompareGhgChart from 'components/compare/compare-ghg-chart';
import CountryGhg from 'components/country/country-ghg';
import CountryNdcOverview from 'components/country/country-ndc-overview';
import NDCSDGLinkages from 'components/country/country-ndc-sdg-linkages';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import EmissionPathwaysGraph from 'components/emission-pathways/emission-pathways-graph';
import MyVisualisationsGraphComponent from 'components/my-climate-watch/my-visualisations/my-cw-vis-graph';
import AgricultureEmissionPieChart from 'components/sectors-agriculture/drivers-of-emissions/card-pie-chart/card-pie-chart';
import LTSExploreMap from 'components/ndcs/lts-explore-map';
import NDCSExploreMap from 'components/ndcs/ndcs-explore-map';
import NDCOverviewSection from 'components/ndcs/ndcs-overview-section';

export default [
  {
    path: '/embed/ndcs',
    component: NDCMap,
    exact: true
  },
  {
    path: '/embed/2020-ndc-tracker',
    component: NDCSEnhancementsViz,
    exact: true
  },
  {
    path: '/embed/lts-tracker',
    component: NDCSLTSViz,
    exact: true
  },
  {
    path: '/embed/lts-explore',
    component: LTSExploreMap,
    exact: true
  },
  {
    path: '/embed/ndcs-explore',
    component: NDCSExploreMap,
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
    exact: true,
    component: () => createElement(CountryNdcOverview, { actions: true })
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
    path: '/embed/agriculture-emission',
    component: AgricultureEmissionPieChart,
    exact: true
  },
  {
    path: '/embed/my-visualizations/:id',
    component: MyVisualisationsGraphComponent,
    exact: true
  },
  {
    path: '/embed/ndc-overview/:section',
    component: NDCOverviewSection,
    exact: true
  },
  {
    path: '/',
    component: () => createElement(Redirect, { to: '/' })
  }
];
