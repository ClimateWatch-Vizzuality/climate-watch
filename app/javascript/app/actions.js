import { actions as countriesProvider } from 'components/countries-provider';
import { actions as countrySelect } from 'components/countries-select';
import { actions as autocompleteSearch } from 'components/autocomplete-search';
import { actions as navActions } from 'components/nav';
import { actions as mapActions } from 'components/map';
import { actions as countryNDCActions } from 'pages/ndc-country';

export default {
  ...countriesProvider,
  ...countrySelect,
  ...countryNDCActions,
  ...navActions,
  ...mapActions,
  ...autocompleteSearch
};
