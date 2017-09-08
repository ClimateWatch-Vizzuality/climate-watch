import { actions as countriesProvider } from 'providers/countries-provider';
import { actions as countrySelect } from 'components/countries-select';
import { actions as autocompleteSearch } from 'components/autocomplete-search';
import { actions as mapActions } from 'components/map';
import { actions as NDCSActions } from 'pages/ndcs';
import { actions as NDCCompareActions } from 'pages/ndc-compare';
import { actions as countrySDGLinkages } from 'components/country-ndc-sdg-linkages';
import { actions as countryNDCActions } from 'pages/ndc-country';
import { actions as countryNDCFullActions } from 'pages/ndc-country-full';

export default {
  ...countriesProvider,
  ...countrySelect,
  ...NDCSActions,
  ...NDCCompareActions,
  ...countrySDGLinkages,
  ...countryNDCActions,
  ...countryNDCFullActions,
  ...mapActions,
  ...autocompleteSearch
};
