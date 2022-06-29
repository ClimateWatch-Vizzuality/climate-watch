import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocationParamUpdated, isEmbededComponent } from 'utils/navigation';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { actions as modalMetadataActions } from 'components/modal-metadata';

import ownActions from './country-ndc-adaptation-actions';
import reducers, { initialState } from './country-ndc-adaptation-reducers';

import CountryNDCSAdaptationComponent from './country-ndc-adaptation-component';
import {
  getCommitmentOptions,
  getGoals,
  getTargets,
  getTargetsByCountry,
  getActiveDatabase,
  getActiveCommitment
} from './country-ndc-adaptation-selectors';

const actions = {
  ...modalMetadataActions,
  ...ownActions
};

const mapStateToProps = (state, { match, location }) => {
  const { iso } = match.params;
  const countries = state.countries.data;
  const countryName = (
    countries.find(({ iso_code3: countryISO }) => iso === countryISO) || {}
  ).wri_standard_name;
  const search = qs.parse(location.search);
  const isEmbed = isEmbededComponent(location);

  return {
    tooltipData: state.countryNDCSAdaptation.tooltipData,
    goals: getGoals(state, search),
    targets: getTargets(state, search),
    targetsData: getTargetsByCountry(state),
    activeCommitment: getActiveCommitment(state),
    loading:
      (!state.ndcsAdaptations.error && state.ndcsAdaptations.loading) ||
      state.ndcsAdaptations.loading,
    countryName,
    isEmbed,
    iso,
    activeDatabase: getActiveDatabase(search),
    commitmentOptions: getCommitmentOptions(state)
  };
};

const CountrySDGLinkagesContainer = props => {
  const { history, location } = props;

  const handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ndc Adaptations');
  };

  const handleInfoClick = () => {
    props.setModalMetadata({
      category: 'Country',
      slugs: 'ndc_adaptation',
      open: true
    });
  };

  // todo: check what clicking on the dot does
  const handleOnDotClick = (targetNumber, targetData) => {
    const { iso } = props;
    if (iso && targetNumber) {
      const { document_type, language } = targetData;
      const path = `/ndcs/country/${iso}/full?query=${targetNumber}&searchBy=target&document=${document_type}-${language}`;
      history.push(path);
    }
  };

  const handleCommitmentChange = option => {
    const { setFilter } = props;
    updateUrlParam({ name: 'commitment', value: option ? option.value : '' });
    setFilter({ commitment: option.value });
    if (option) {
      handleAnalytics('Country', 'Change commitment', option.label);
    }
  };

  const handleDatabaseChange = option => {
    updateUrlParam({ name: 'database', value: option ? option.value : '' });
    if (option) {
      handleAnalytics('Country', 'Change database', option.label);
    }
  };

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  return createElement(CountryNDCSAdaptationComponent, {
    ...props,
    handleCommitmentChange,
    handleDatabaseChange,
    handleInfoClick,
    handleAnalyticsClick,
    handleOnDotClick
  });
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
