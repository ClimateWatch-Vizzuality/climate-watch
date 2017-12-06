import { createElement, PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';

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
  getQuantificationsData
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
    config: getChartConfig(countryGhg),
    selectorDefaults: getSelectorDefaults(countryGhg)
  };
};

function needsRequestData(props, nextProps) {
  const { sourceSelected } = nextProps;
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

    // hide quantification sources from prod
    // slugs: [source, 'ndc_quantification_UNDP', 'ndc_quantification_WRI'],
    if (source) {
      this.props.setModalMetadata({
        slugs: [source],
        customTitle: 'Greenhouse Gas Emissions and Emissions Targets',
        open: true
      });
    }
  };

  handleSourceChange = category => {
    if (category) {
      this.updateUrlParam({ name: 'source', value: category.value });
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

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryGhgEmissionsContainer)
);
