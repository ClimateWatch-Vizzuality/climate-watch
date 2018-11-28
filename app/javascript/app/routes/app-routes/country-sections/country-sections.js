import { createElement } from 'react';

import GHGCountryEmissions from 'components/country/country-ghg';
import NDCSDGLinkages from 'components/country/country-ndc-sdg-linkages';
import ClimateVulnerability from 'components/country/country-climate-vulnerability';
import CountryNdcOverview from 'components/country/country-ndc-overview';
import LawsAndPolicies from 'components/country/laws-and-policies';

const FEATURE_LAWS_AND_POLICIES =
  process.env.FEATURE_LAWS_AND_POLICIES === 'true';

const routes = [
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
    component: () => createElement(CountryNdcOverview, { actions: true })
  },
  {
    hash: 'ndc-sdg-linkages',
    label: 'NDC-SDG Linkages',
    anchor: true,
    component: NDCSDGLinkages
  }
];

if (FEATURE_LAWS_AND_POLICIES) {
  routes.push({
    hash: 'laws-and-policies',
    label: 'Targets in Laws and Policies',
    anchor: true,
    component: LawsAndPolicies
  });
}

export default routes;
