import { actions as countryExplorerActions } from 'components/country-explorer';
import { actions as countryNDCActions } from 'components/ndc-country';

export default {
  ...countryExplorerActions,
  ...countryNDCActions
};
