import { createElement, PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';

import { actions as modalMetaActions } from 'components/modal-metadata';
import {
  getSourceOptions,
  getSourceSelected,
  getChartData,
  getChartConfig,
  getSelectorDefaults
} from './country-ghg-emissions-selectors';

import CountryGhgEmissionsComponent from './country-ghg-emissions-component';
import actions from './country-ghg-emissions-actions';

const mergedActions = { ...actions, ...modalMetaActions };

const mapStateToProps = (state, { location, match }) => {
  const { data } = state.countryGhgEmissions;
  const { meta } = state.ghgEmissionsMeta;
  const search = qs.parse(location.search);
  const countryGhg = {
    meta,
    data,
    search
  };
  return {
    iso: match.params.iso,
    loading: state.countryGhgEmissions.loading,
    data: getChartData(countryGhg),
    sources: getSourceOptions(countryGhg),
    sourceSelected: getSourceSelected(countryGhg),
    config: getChartConfig(countryGhg),
    selectorDefaults: getSelectorDefaults(countryGhg)
  };
};

function needsRequestData(props, nextProps) {
  const { sourceSelected } = nextProps;
  const hasValues = sourceSelected.value;
  const hasChanged = sourceSelected.value !== props.sourceSelected.value;
  return hasValues && hasChanged;
}

function getFiltersParsed(props) {
  const { sourceSelected, selectorDefaults } = props;
  const filter = {};
  filter.location = props.iso;
  filter.gas = selectorDefaults.gas;
  filter.source = sourceSelected
    ? sourceSelected.value
    : selectorDefaults.source;
  return filter;
}

class CountryGhgEmissionsContainer extends PureComponent {
  constructor(props) {
    super(props);
    if (props.sourceSelected.value) {
      const filters = getFiltersParsed(props);
      props.fetchCountryGhgEmissionsData(filters);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (needsRequestData(this.props, nextProps)) {
      const { fetchCountryGhgEmissionsData } = nextProps;
      const filters = getFiltersParsed(nextProps);
      fetchCountryGhgEmissionsData(filters);
    }
  }

  handleInfoClick = () => {
    this.props.setModalMetadata({
      open: true,
      slug: 'cait_historical_emissions'
    });
  };

  handleSourceChange = category => {
    if (category) {
      this.updateUrlParam({ name: 'source', value: category.value }, true);
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(CountryGhgEmissionsComponent, {
      ...this.props,
      handleSourceChange: this.handleSourceChange,
      handleInfoClick: this.handleInfoClick
    });
  }
}

CountryGhgEmissionsContainer.propTypes = {
  history: Proptypes.object,
  location: Proptypes.object,
  sourceSelected: Proptypes.object,
  setModalMetadata: Proptypes.func,
  fetchCountryGhgEmissionsData: Proptypes.func
};

export { default as component } from './country-ghg-emissions-component';
export { initialState } from './country-ghg-emissions-reducers';
export { default as reducers } from './country-ghg-emissions-reducers';
export { default as styles } from './country-ghg-emissions-styles';
export { default as actions } from './country-ghg-emissions-actions';

export default withRouter(
  connect(mapStateToProps, mergedActions)(CountryGhgEmissionsContainer)
);
