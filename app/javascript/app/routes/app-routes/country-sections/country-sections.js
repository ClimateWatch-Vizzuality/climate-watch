import { createElement } from 'react';

import ClimateCommitments from 'components/country/country-climate-commitments';
import ClimateEnhancements from 'components/country/country-climate-enhancements';
import GHGCountryEmissions from 'components/country/country-ghg';
import NDCSDGLinkages from 'components/country/country-ndc-sdg-linkages';
import ClimateVulnerability from 'components/country/country-climate-vulnerability';
import CountryNdcOverview from 'components/country/country-ndc-overview';
import CountryLtsOverview from 'components/country/country-lts-overview';
import LawsAndPolicies from 'components/country/laws-and-policies';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

const FEATURE_SHOW_COUNTRY_LAWS_AND_POLICIES =
  process.env.FEATURE_SHOW_COUNTRY_LAWS_AND_POLICIES === 'true';

// eslint-disable-next-line import/no-mutable-exports
let routes = [
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
    component: () => createElement(CountryNdcOverview, { isCountryPage: true })
  },
  {
    hash: 'lts-content-overview',
    label: 'LTS Content Overview',
    anchor: true,
    component: () => createElement(CountryLtsOverview, { isCountryPage: true })
  },
  {
    hash: 'ndc-sdg-linkages',
    label: 'NDC-SDG Linkages',
    anchor: true,
    component: NDCSDGLinkages
  },
  FEATURE_SHOW_COUNTRY_LAWS_AND_POLICIES && {
    hash: 'laws-and-policies',
    label: 'Targets in Laws and Policies',
    anchor: true,
    component: LawsAndPolicies
  }
].filter(Boolean);

if (FEATURE_COUNTRY_CHANGES) {
  routes = [
    {
      hash: 'climate-commitments',
      label: 'Climate commitments',
      anchor: true,
      component: ClimateCommitments
    },
    {
      hash: 'climate-enhancements',
      label: 'Climate enhancements',
      anchor: true,
      component: ClimateEnhancements
    }
  ].concat(routes);
}

export default routes;
