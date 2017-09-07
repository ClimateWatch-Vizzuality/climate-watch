import { actions as countriesProvider } from 'providers/countries-provider';
import { actions as countrySelect } from 'components/countries-select';
import { actions as autocompleteSearch } from 'components/autocomplete-search';
import { actions as mapActions } from 'components/map';
import { actions as NDCSActions } from 'pages/ndcs';
import { actions as countryNDCActions } from 'pages/ndc-country';

export default {
  ...countriesProvider,
  ...countrySelect,
  ...NDCSActions,
  ...countryNDCActions,
  ...mapActions,
  ...autocompleteSearch
};
