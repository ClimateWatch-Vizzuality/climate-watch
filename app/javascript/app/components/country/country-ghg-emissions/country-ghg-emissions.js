import { createElement, PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getLocationParamUpdated,
  isPageContained,
  isEmbededComponent,
  isPageNdcp
} from 'utils/navigation';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { actions as modalActions } from 'components/modal-metadata';
import ownActions from './country-ghg-emissions-actions';
import reducers, { initialState } from './country-ghg-emissions-reducers';

import CountryGhgEmissionsComponent from './country-ghg-emissions-component';
import {
  getCountryName,
  getSourceOptions,
  getCalculationOptions,
  getSourceSelected,
  getCalculationSelected,
  getChartData,
  getChartDomain,
  getChartConfig,
  getSelectorDefaults,
  getQuantificationsData,
  getQuantificationsTagsConfig,
  getFilterOptions,
  getFiltersSelected
} from './country-ghg-emissions-selectors';

const actions = { ...ownActions, ...modalActions };

const FEATURE_NEW_GHG = process.env.FEATURE_NEW_GHG === 'true';

const mapStateToProps = (state, { location, match }) => {
  const { data, quantifications } = state.countryGhgEmissions;
  const calculationData = state.wbCountryData.data;
  const { meta } = state.ghgEmissionsMeta;
  const isEmbed = isEmbededComponent(location);
  const isNdcp = isPageNdcp(location) || isPageContained;
  const search = qs.parse(location.search);
  const iso = match.params.iso;
  const countryGhg = {
    iso,
    meta,
    data,
    countries: state.countries,
    calculationData,
    search,
    quantifications
  };
  return {
    iso,
    isEmbed,
    isNdcp,
    countryName: getCountryName(countryGhg),
    loading: state.countryGhgEmissions.loading || state.wbCountryData.loading,
    data: getChartData(countryGhg),
    domain: getChartDomain(countryGhg),
    quantifications: getQuantificationsData(countryGhg),
    quantificationsTagsConfig: getQuantificationsTagsConfig(countryGhg),
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
        slugs: isPageContained ? [source] : [source, 'ndc_quantification_UNDP'],
        customTitle: 'Greenhouse Gas Emissions and Emissions Targets',
        disclaimerConfig: {
          display: !isPageContained,
          onlyText: true
        },
        open: true
      });
    }
  };

  handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ghg emissions');
  };

  handleSourceChange = category => {
    const { search } = this.props.location;
    const searchQuery = qs.parse(search);
    if (category) {
      this.updateUrlParam(
        [
          {
            name: 'source',
            value: FEATURE_NEW_GHG ? category.name : category.value
          },
          { name: 'sector', value: searchQuery.sector },
          { name: 'calculation', value: searchQuery.calculation }
        ],
        true
      );
      handleAnalytics('Country', 'Change Emissions source', category.label);
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
