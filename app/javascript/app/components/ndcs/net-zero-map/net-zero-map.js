import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { IGNORED_COUNTRIES_ISOS } from 'data/ignored-countries';
import { actions as fetchActions } from 'pages/net-zero';
import { actions as modalActions } from 'components/modal-metadata';
import exploreMapActions from 'components/ndcs/shared/explore-map/explore-map-actions';
import { getHoverIndex } from 'components/ndcs/shared/utils';

import Component from './net-zero-map-component';
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
  getDonutActiveIndex,
  getIsShowEUCountriesChecked
} from './net-zero-map-selectors';

const actions = { ...fetchActions, ...modalActions, ...exploreMapActions };

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
    checked: getIsShowEUCountriesChecked(LTSWithSelection),
    donutActiveIndex: getDonutActiveIndex(LTSWithSelection)
  };
};

class NetZeroMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      tooltipValues: {}
    };
  }

  componentWillMount() {
    // Note: This fetch is not filtered by category like the NDC as the data is not so big
    // If it starts getting big copy the logic in ndcs-explore-map.js with the lts emissions indicator
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
      this.props.history.push(`/countries/${countryIso}`);
      handleAnalytics(
        'Net-Zero Map',
        'Use map to find country',
        name || geography.properties.name
      );
    }
  };

  handleCountryEnter = geography => {
    const {
      tooltipCountryValues,
      legendData,
      selectActiveDonutIndex,
      emissionsCardData
    } = this.props;
    const iso = geography.properties && geography.properties.id;

    if (IGNORED_COUNTRIES_ISOS.includes(iso)) {
      // We won't show Taiwan and Western Sahara as an independent country
      this.setState({ tooltipValues: null, country: null });
    } else {
      const tooltipValue = tooltipCountryValues && tooltipCountryValues[iso];
      if (tooltipValue && tooltipValue.labelId) {
        const hoveredlegendData = legendData.find(
          l => parseInt(l.id, 10) === tooltipValue.labelId
        );
        if (hoveredlegendData) {
          selectActiveDonutIndex(
            getHoverIndex(emissionsCardData, hoveredlegendData)
          );
        }
      } else if (legendData) {
        // This is the last legend item aggregating all the no data geographies
        selectActiveDonutIndex(
          getHoverIndex(emissionsCardData, legendData[legendData.length - 1])
        );
      }

      const tooltipValues = {
        value: (tooltipValue && tooltipValue.value) || 'No Document Submitted',
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
    handleAnalytics('Net-Zero Map', 'Change category', category.label);
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam({ name: 'indicator', value: indicator.value });
    handleAnalytics('Net-Zero Map', 'Change indicator', indicator.label);
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      customTitle: 'Net Zero Tracker',
      category: 'Net Zero Map',
      slugs: ['eciu'],
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

NetZeroMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  emissionsCardData: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  fetchLTS: PropTypes.func.isRequired,
  query: PropTypes.string,
  summaryData: PropTypes.array,
  indicator: PropTypes.object,
  tooltipCountryValues: PropTypes.object,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  legendData: PropTypes.array,
  checked: PropTypes.bool
};

export default withRouter(
  connect(mapStateToProps, actions)(NetZeroMapContainer)
);
