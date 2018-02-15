import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import ReactGA from 'react-ga';
import CompareGhgChartComponent from './compare-ghg-chart-component';
// getChartData,
// getChartConfig,
import {
  getSourceOptions,
  getSourceSelected,
  calculationOptions,
  getCalculationSelected,
  getFiltersSelected,
  getChartData,
  getChartConfig,
  parseSelectedLocations
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
    calculationData
  };
  return {
    sourceOptions: getSourceOptions(ghg),
    sourceSelected: getSourceSelected(ghg),
    calculationOptions,
    calculationSelected: getCalculationSelected(ghg),
    data: getChartData(ghg),
    config: getChartConfig(ghg),
    selectedLocations: parseSelectedLocations(ghg),
    providerFilters: getFiltersSelected(ghg),
    loading:
      state.ghgEmissionsMeta.loading ||
      state.ghgEmissions.loading ||
      !getCalculationSelected(ghg)
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

  render() {
    return createElement(CompareGhgChartComponent, {
      ...this.props,
      handleSourceChange: this.handleSourceChange,
      handleCalculationChange: this.handleCalculationChange,
      handleInfoClick: this.handleInfoClick
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
