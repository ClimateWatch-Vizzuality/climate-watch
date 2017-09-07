import { initialState as map } from 'components/map';
import { initialState as ndcs } from 'pages/ndcs';
import { initialState as countryNDC } from 'pages/ndc-country';
import { initialState as countryNDCFull } from 'pages/ndc-country-full';
import { initialState as countrySelect } from 'components/countries-select';
import { initialState as autocompleteSearch } from 'components/autocomplete-search';
import { initialState as countries } from 'providers/countries-provider';

export default {
  countries,
  map,
  ndcs,
  countryNDC,
  countryNDCFull,
  countrySelect,
  autocompleteSearch
};
