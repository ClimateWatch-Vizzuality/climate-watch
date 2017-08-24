import { actions as countrySelect } from 'components/countries-select';
import { actions as autocompleteSearch } from 'components/autocomplete-search';
import { actions as navActions } from 'components/nav';
import { actions as mapActions } from 'components/map';
import { actions as NDCSActions } from 'pages/ndcs';
import { actions as countryNDCActions } from 'pages/ndc-country';

export default {
  ...countrySelect,
  ...NDCSActions,
  ...countryNDCActions,
  ...navActions,
  ...mapActions,
  ...autocompleteSearch
};
