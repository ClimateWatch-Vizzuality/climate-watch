import { actions as countrySelect } from 'components/countries-select';
import { actions as navActions } from 'components/nav';
import { actions as mapActions } from 'components/map';
import { actions as countryNDCActions } from 'pages/ndc-country';

export default {
  ...countrySelect,
  ...countryNDCActions,
  ...navActions,
  ...mapActions
};
