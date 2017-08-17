import { actions as countryExplorerActions } from 'components/country-explorer';
import { actions as ndcActions } from 'components/ndc';
import { actions as countrySelect } from 'components/countries-select';

export default {
  ...countryExplorerActions,
  ...ndcActions,
  ...countrySelect
};
