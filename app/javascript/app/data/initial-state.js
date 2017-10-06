import { initialState as map } from 'components/map';
import { initialState as countrySDGLinkages } from 'components/country-ndc-sdg-linkages';
import { initialState as countrySelect } from 'components/countries-select';
import { initialState as autocompleteSearch } from 'components/autocomplete-search';
import { initialState as stories } from 'components/stories';
import { initialState as ghgEmissions } from 'components/ghg-emissions';
import { initialState as ndcs } from 'pages/ndcs';
import { initialState as countryGhgEmissions } from 'components/country-ghg-emissions';
import { initialState as countryNDC } from 'pages/ndc-country';
import { initialState as countryNDCFull } from 'pages/ndc-country-full';
import { initialState as NDCCompare } from 'pages/ndc-compare';
import { initialState as ndcSearch } from 'pages/ndc-search';
import { initialState as countries } from 'providers/countries-provider';
import { initialState as regions } from 'providers/regions-provider';
import { initialState as geoLocation } from 'providers/geolocation-provider';

export default {
  countries,
  regions,
  stories,
  geoLocation,
  map,
  ndcs,
  countryGhgEmissions,
  countrySDGLinkages,
  countryNDC,
  countryNDCFull,
  NDCCompare,
  countrySelect,
  autocompleteSearch,
  ndcSearch,
  ghgEmissions
};
