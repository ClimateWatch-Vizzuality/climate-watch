import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as fetchActions } from 'pages/lts-explore';
import { actions as modalActions } from 'components/modal-metadata';

import Component from './lts-explore-map-component';
import {
  getMapIndicator,
  getPathsWithStyles,
  getISOCountries,
  getLinkToDataExplorer,
  getEmissionsCardData,
  getLegend,
  getSummaryCardData,
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getTooltipCountryValues,
  getIsShowEUCountriesChecked
} from './lts-explore-map-selectors';

const actions = { ...fetchActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.LTS;
  const { countries } = state;
  const search = qs.parse(location.search);

  const LTSWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    categorySelected: search.category,
    indicatorSelected: search.indicator,
    categories: data.categories,
    emissions: state.emissions,
    search
  };

  return {
    loading,
    query: LTSWithSelection.query,
    paths: getPathsWithStyles(LTSWithSelection),
    isoCountries: getISOCountries(LTSWithSelection),
    selectedIndicator: getMapIndicator(LTSWithSelection),
    emissionsCardData: getEmissionsCardData(LTSWithSelection),
    tooltipCountryValues: getTooltipCountryValues(LTSWithSelection),
    legendData: getLegend(LTSWithSelection),
    summaryCardData: getSummaryCardData(LTSWithSelection),
    downloadLink: getLinkToDataExplorer(LTSWithSelection),
    categories: getCategories(LTSWithSelection),
    indicators: getCategoryIndicators(LTSWithSelection),
    selectedCategory: getSelectedCategory(LTSWithSelection),
    checked: getIsShowEUCountriesChecked(LTSWithSelection)
  };
};

class LTSExploreMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      tooltipValues: {}
    };
  }

  componentWillMount() {
    this.props.fetchLTS();
  }

  handleOnChangeChecked = query => {
    this.updateUrlParam({ name: 'showEUCountries', value: query });
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCountryClick = (geography, countryData) => {
    const { isoCountries } = this.props;
    const { id: iso, name } = countryData || {};
    const countryIso =
      iso || (geography && geography.properties && geography.properties.id);
    if (countryIso && isCountryIncluded(isoCountries, countryIso)) {
      this.props.history.push(`/lts/country/${countryIso}`);
      handleAnalytics(
        'LTS Explore Map',
        'Use map to find country',
        name || geography.properties.name
      );
    }
  };

  handleCountryEnter = geography => {
    const { tooltipCountryValues } = this.props;
    const iso = geography.properties && geography.properties.id;

    if (iso === 'TWN') {
      // We won't show Taiwan as an independent country
      this.setState({ tooltipValues: null, country: null });
    } else {
      const tooltipValues = {
        value:
          tooltipCountryValues && tooltipCountryValues[iso]
            ? tooltipCountryValues[iso].value
            : 'No Document Submitted',
        countryName: geography.properties && geography.properties.name
      };

      this.setState({ tooltipValues, country: geography.properties });
    }
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCategoryChange = category => {
    this.updateUrlParam(
      {
        name: 'category',
        value: category.value
      },
      true
    );
    handleAnalytics('LTS Explore Map', 'Change category', category.label);
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam({ name: 'indicator', value: indicator.value });
    handleAnalytics('LTS Explore Map', 'Change indicator', indicator.label);
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      customTitle: 'LTS Explore',
      category: 'LTS Explore Map',
      slugs: ['ndc_lts'],
      open: true
    });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleInfoClick: this.handleInfoClick,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange,
      handleOnChangeChecked: this.handleOnChangeChecked,
      checked: this.props.checked,
      indicator: this.props.indicator,
      countryData: this.state.country,
      summaryData: this.props.summaryData,
      tooltipValues: this.state.tooltipValues
    });
  }
}

LTSExploreMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  fetchLTS: PropTypes.func.isRequired,
  query: PropTypes.string,
  summaryData: PropTypes.array,
  indicator: PropTypes.object,
  tooltipCountryValues: PropTypes.object,
  checked: PropTypes.bool
};

export default withRouter(
  connect(mapStateToProps, actions)(LTSExploreMapContainer)
);
