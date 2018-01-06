import { createElement, PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import ReactGA from 'react-ga';

import { actions as modalActions } from 'components/modal-metadata';
import ownActions from './country-ghg-emissions-actions';
import reducers, { initialState } from './country-ghg-emissions-reducers';

import CountryGhgEmissionsComponent from './country-ghg-emissions-component';
import {
  getSourceOptions,
  getCalculationOptions,
  getSourceSelected,
  getCalculationSelected,
  getChartData,
  getChartConfig,
  getSelectorDefaults,
  getQuantificationsData,
  getFilterOptions,
  getFiltersSelected
} from './country-ghg-emissions-selectors';

const actions = { ...ownActions, ...modalActions };

const mapStateToProps = (state, { location, match }) => {
  const { data, quantifications } = state.countryGhgEmissions;
  const calculationData = state.wbCountryData.data;
  const { meta } = state.ghgEmissionsMeta;
  const search = qs.parse(location.search);
  const iso = match.params.iso;
  const countryGhg = {
    iso,
    meta,
    data,
    calculationData,
    search,
    quantifications
  };
  return {
    iso,
    loading: state.countryGhgEmissions.loading || state.wbCountryData.loading,
    data: getChartData(countryGhg),
    quantifications: getQuantificationsData(countryGhg),
    calculations: getCalculationOptions(countryGhg),
    calculationSelected: getCalculationSelected(countryGhg),
    sources: getSourceOptions(countryGhg),
    sourceSelected: getSourceSelected(countryGhg),
    filtersOptions: getFilterOptions(countryGhg),
    filtersSelected: getFiltersSelected(countryGhg),
    config: getChartConfig(countryGhg),
    selectorDefaults: getSelectorDefaults(countryGhg)
  };
};

function needsRequestData(props, nextProps) {
  const { iso, sourceSelected } = nextProps;
  const isNewCountry = iso !== props.iso;
  if (isNewCountry) return true;
  const hasValues = sourceSelected && sourceSelected.value;
  if (!hasValues) return false;
  const hasChanged = sourceSelected.value !== props.sourceSelected.value;
  return hasChanged;
}

function getFiltersParsed(props) {
  const { sourceSelected, selectorDefaults } = props;
  const filter = {};
  filter.location = props.iso;
  filter.gas = selectorDefaults.gas;
  filter.source = sourceSelected.value || null;
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
    const { source } = this.props.sourceSelected;

    if (source) {
      this.props.setModalMetadata({
        category: 'Country',
        slugs: [source, 'ndc_quantification_UNDP', 'ndc_quantification_WRI'],
        customTitle: 'Greenhouse Gas Emissions and Emissions Targets',
        open: true
      });
    }
  };

  handleAnalyticsClick = () => {
    ReactGA.event({
      category: 'Country',
      action: 'Leave page to explore data',
      label: 'Ghg emissions'
    });
  };

  handleSourceChange = category => {
    const { search } = this.props.location;
    const searchQuery = qs.parse(search);
    if (category) {
      this.updateUrlParam(
        [
          { name: 'source', value: category.value },
          { name: 'sector', value: searchQuery.sector },
          { name: 'calculation', value: searchQuery.calculation }
        ],
        true
      );
      ReactGA.event({
        category: 'Country',
        action: 'Change Emissions source',
        label: category.label
      });
    }
  };

  handleCalculationChange = calculation => {
    if (calculation) {
      this.updateUrlParam({ name: 'calculation', value: calculation.value });
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
      handleCalculationChange: this.handleCalculationChange,
      handleInfoClick: this.handleInfoClick,
      handleAnalyticsClick: this.handleAnalyticsClick
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

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryGhgEmissionsContainer)
);
