import { actions as countryExplorerActions } from 'components/country-explorer';
import { actions as ndcActions } from 'components/ndc';
import { actions as countrySelect } from 'components/countries-select';
import { actions as countryNDCActions } from 'components/ndc-country';

export default {
  ...countryExplorerActions,
  ...ndcActions,
  ...countrySelect,
  ...countryNDCActions
};
