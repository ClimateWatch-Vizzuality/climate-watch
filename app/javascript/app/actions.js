import { actions as countryExplorerActions } from 'components/country-explorer';
import { actions as countrySelect } from 'components/countries-select';
import { actions as navActions } from 'components/nav';
import { actions as mapActions } from 'components/map';
import { actions as countryNDCActions } from 'pages/ndc-country';

export default {
  ...countryExplorerActions,
  ...countrySelect,
  ...countryNDCActions,
  ...navActions,
  ...mapActions
};
