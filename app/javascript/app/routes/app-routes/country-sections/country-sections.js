import { createElement } from 'react';

import ClimateCommitments from 'components/country/country-climate-commitments';
import ClimateEnhancements from 'components/country/country-climate-enhancements';
import GHGCountryEmissions from 'components/country/country-ghg';
import EmissionDrivers from 'components/country/country-emission-drivers';
import NDCSDGLinkages from 'components/country/country-ndc-sdg-linkages';
import ClimateVulnerability from 'components/country/country-climate-vulnerability';
import NDCAdaptation from 'components/country/country-ndc-adaptation';
import CountryNdcOverview from 'components/country/country-ndc-overview';
import CountryLtsOverview from 'components/country/country-lts-overview';
import LawsAndPolicies from 'components/country/laws-and-policies';
import SubnationalActions from 'components/country/country-subnational-actions';
import EmploymentAndCosts from 'components/country/country-employment-and-costs';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

const FEATURE_SHOW_COUNTRY_LAWS_AND_POLICIES =
  process.env.FEATURE_SHOW_COUNTRY_LAWS_AND_POLICIES === 'true';

// eslint-disable-next-line import/no-mutable-exports
const routes = [
  FEATURE_COUNTRY_CHANGES && {
    hash: 'commitments-overview',
    label: 'Commitments Overview',
    anchor: true,
    component: ClimateCommitments
  },
  FEATURE_COUNTRY_CHANGES && {
    hash: 'climate-enhancements',
    label: 'NDC Enhancements',
    anchor: true,
    component: ClimateEnhancements
  },
  {
    hash: 'ghg-emissions',
    label: 'GHG Emissions',
    anchor: true,
    component: GHGCountryEmissions
  },
  FEATURE_COUNTRY_CHANGES && {
    hash: 'emission-drivers',
    label: 'Emissions Drivers',
    anchor: true,
    component: EmissionDrivers
  },
  process.env.FEATURE_COUNTRY_CHANGES === 'true' && {
    hash: 'climate-commitmentss',
    label: 'Climate Commitments',
    anchor: true,
    component: () => createElement(CountryNdcOverview, { isCountryPage: true })
  },
  {
    hash: 'climate-vulnerability',
    label: 'Climate Vulnerability and Readiness',
    anchor: true,
    component: ClimateVulnerability
  },
  process.env.FEATURE_COUNTRY_CHANGES === 'true' && {
    hash: 'ndc-adaptation',
    label: 'NDC Adaptation Plans',
    anchor: true,
    component: NDCAdaptation
  },
  process.env.FEATURE_COUNTRY_CHANGES !== 'true' && {
    hash: 'ndc-content-overview',
    label: 'NDC Content Overview',
    anchor: true,
    component: () => createElement(CountryNdcOverview, { isCountryPage: true })
  },
  process.env.FEATURE_COUNTRY_CHANGES !== 'true' && {
    hash: 'lts-content-overview',
    label: 'LTS Content Overview',
    anchor: true,
    component: () => createElement(CountryLtsOverview, { isCountryPage: true })
  },
  FEATURE_COUNTRY_CHANGES && {
    hash: 'subnational-actions',
    label: 'Subnational Actions',
    anchor: true,
    component: SubnationalActions
  },
  FEATURE_SHOW_COUNTRY_LAWS_AND_POLICIES && {
    hash: 'laws-and-policies',
    label: 'Targets in Laws and Policies',
    anchor: true,
    component: LawsAndPolicies
  },
  FEATURE_COUNTRY_CHANGES && {
    hash: 'employment-and-costs',
    label: 'Employment and Costs',
    anchor: true,
    component: EmploymentAndCosts
  },
  {
    hash: 'ndc-sdg-linkages',
    label: 'NDC-SDG Linkages',
    anchor: true,
    component: NDCSDGLinkages
  }
].filter(Boolean);

export default routes;
