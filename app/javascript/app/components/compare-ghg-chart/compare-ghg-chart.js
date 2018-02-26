import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import ReactGA from 'react-ga';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import CompareGhgChartComponent from './compare-ghg-chart-component';
import {
  getSourceOptions,
  getSourceSelected,
  calculationOptions,
  getCalculationSelected,
  getFiltersSelected,
  getChartData,
  getChartConfig,
  parseLocations,
  getLocationsFilter
} from './compare-ghg-chart-selectors';

const mapStateToProps = (state, { location }) => {
  const { data } = state.emissions;
  const { meta } = state.ghgEmissionsMeta;
  const { data: regions } = state.regions;
  const search = qs.parse(location.search);
  const calculationData = state.wbCountryData.data;
  const ghg = {
    data,
    regions,
    search,
    meta,
    selectedLocations: search.locations,
    calculationData,
    countriesData: state.countries.data
  };
  const calculationSelected = getCalculationSelected(ghg);
  const needsWBData =
    calculationSelected.value !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value;
  return {
    sourceOptions: getSourceOptions(ghg),
    sourceSelected: getSourceSelected(ghg),
    calculationOptions,
    calculationSelected: getCalculationSelected(ghg),
    data: getChartData(ghg),
    config: getChartConfig(ghg),
    selectedLocations: parseLocations(ghg),
    selectedLocationsFilter: getLocationsFilter(ghg),
    providerFilters: getFiltersSelected(ghg),
    needsWBData,
    loading:
      state.ghgEmissionsMeta.loading ||
      state.emissions.loading ||
      !calculationSelected ||
      (needsWBData && state.wbCountryData.loading)
  };
};

class CompareGhgChartContainer extends PureComponent {
  handleSourceChange = category => {
    this.updateUrlParam([{ name: 'source', value: category.value }]);
    ReactGA.event({
      category: 'Country comparison',
      action: 'Source selected',
      label: category.label
    });
  };

  handleCalculationChange = calculation => {
    this.updateUrlParam(
      { name: 'calculation', value: calculation.value },
      false
    );
    ReactGA.event({
      category: 'Country comparison',
      action: 'Calculation selected',
      label: calculation.label
    });
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleInfoClick = () => {
    const { source } = this.props.sourceSelected;
    if (source) {
      this.props.setModalMetadata({
        category: 'Country comparison',
        slugs: source,
        open: true
      });
    }
  };

  handleAnalyticsClick = () => {
    ReactGA.event({
      category: 'Compare',
      action: 'Leave page to explore data',
      label: 'Ghg emissions'
    });
  };

  render() {
    return createElement(CompareGhgChartComponent, {
      ...this.props,
      handleSourceChange: this.handleSourceChange,
      handleCalculationChange: this.handleCalculationChange,
      handleInfoClick: this.handleInfoClick,
      handleAnalyticsClick: this.handleAnalyticsClick
    });
  }
}

CompareGhgChartContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  sourceSelected: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired
};

CompareGhgChartContainer.defaultProps = {
  sourceSelected: null
};

export default withRouter(
  connect(mapStateToProps, actions)(CompareGhgChartContainer)
);
