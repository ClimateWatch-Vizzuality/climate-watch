import { initialState as map } from 'components/map';
import { initialState as ndcs } from 'pages/ndcs';
import { initialState as countrySDGLinkages } from 'components/country-ndc-sdg-linkages';
import { initialState as countryNDC } from 'pages/ndc-country';
import { initialState as countryNDCFull } from 'pages/ndc-country-full';
import { initialState as NDCCompare } from 'pages/ndc-compare';
import { initialState as search } from 'pages/search';
import { initialState as countrySelect } from 'components/countries-select';
import { initialState as autocompleteSearch } from 'components/autocomplete-search';
import { initialState as countries } from 'providers/countries-provider';

export default {
  countries,
  map,
  ndcs,
  countrySDGLinkages,
  countryNDC,
  countryNDCFull,
  NDCCompare,
  countrySelect,
  autocompleteSearch,
  search
};
