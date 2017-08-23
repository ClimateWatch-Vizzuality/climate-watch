import { actions as countrySelect } from 'components/countries-select';
import { actions as countryNDCActions } from 'components/ndc-country';
import { actions as navActions } from 'components/nav';
import { actions as mapActions } from 'components/map';

export default {
  ...countrySelect,
  ...countryNDCActions,
  ...navActions,
  ...mapActions
};
