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
  getDocuments,
  getSectors,
  getTargets,
  getTargetsByCountry,
  getActiveDatabase,
  getActiveDocument
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
    sectors: getSectors(state, search),
    targets: getTargets(state, search),
    targetsData: getTargetsByCountry(state),
    activeDocument: getActiveDocument(state, { iso }),
    loading:
      (!state.ndcsAdaptations.error && state.ndcsAdaptations.loading) ||
      state.ndcsAdaptations.loading,
    countryName,
    isEmbed,
    iso,
    activeDatabase: getActiveDatabase(search),
    documentOptions: getDocuments(state, { iso })
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

  const handleDocumentChange = option => {
    const { setFilter } = props;
    updateUrlParam({ name: 'document', value: option ? option.value : '' });
    setFilter({ document: option.value });
    if (option) {
      handleAnalytics('Country', 'Change document', option.label);
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
    handleDocumentChange,
    handleDatabaseChange,
    handleInfoClick,
    handleAnalyticsClick
  });
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
