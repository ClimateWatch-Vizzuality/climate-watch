import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as fetchActions } from 'pages/ndcs-lts';
import { actions as modalActions } from 'components/modal-metadata';
import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory
} from 'components/ndcs/ndcs-map/ndcs-map-selectors';

import Component from './lts-explore-map-component';

import {
  getMapIndicator,
  getPathsWithStyles,
  getISOCountries,
  getLinkToDataExplorer,
  getEmissionsCardData,
  getLegend,
  getSummaryCardData
} from './lts-explore-map-selectors';

const actions = { ...fetchActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsLTS;
  const { countries } = state;
  const search = qs.parse(location.search);

  const mapCategories = {};
  if (data.categories) {
    Object.keys(data.categories).forEach(id => {
      if (data.categories[id].type === 'map') {
        mapCategories[id] = data.categories[id];
      }
    });
  }

  const ndcsLTSWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    categorySelected: search.category,
    indicatorSelected: search.indicator,
    categories: mapCategories,
    emissions: state.emissions,
    search
  };

  return {
    loading,
    query: ndcsLTSWithSelection.query,
    paths: getPathsWithStyles(ndcsLTSWithSelection),
    isoCountries: getISOCountries(ndcsLTSWithSelection),
    selectedIndicator: getMapIndicator(ndcsLTSWithSelection),
    emissionsCardData: getEmissionsCardData(ndcsLTSWithSelection),
    legendData: getLegend(ndcsLTSWithSelection),
    summaryCardData: getSummaryCardData(ndcsLTSWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsLTSWithSelection),
    categories: getCategories(ndcsLTSWithSelection),
    indicators: getCategoryIndicators(ndcsLTSWithSelection),
    selectedCategory: getSelectedCategory(ndcsLTSWithSelection)
  };
};

class LTSExploreMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  componentWillMount() {
    this.props.fetchNDCSLTS();
  }

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { indicator, indicators } = this.props;
    if (!geometryIdHover || !indicator) return '';

    const id = geometryIdHover;

    const targetIndicator = indicators.find(i => i.value === 'lts_target');

    if (
      indicator.locations &&
      indicator.locations[id] &&
      indicator.locations[id].value === 'Long-term Strategy Submitted'
    ) {
      return `Long-term Target: <em>${targetIndicator.locations[id].value}</em>`;
    }
    return '';
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCountryClick = geography => {
    const { isoCountries } = this.props;
    const iso = geography.properties && geography.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      this.props.history.push(`/ndcs/country/${iso}`);
      handleAnalytics(
        'LTS Explore Map',
        'Use map to find country',
        geography.properties.name
      );
    }
  };

  handleCountryEnter = geography => {
    const iso = geography.properties && geography.properties.id;
    if (iso) this.setState({ geometryIdHover: iso });
    this.setState({ country: geography.properties });
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
      slugs: ['ndc_cw', 'ndc_wb', 'ndc_die'],
      open: true
    });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  render() {
    const tooltipTxt = this.getTooltipText();
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleInfoClick: this.handleInfoClick,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange,
      indicator: this.props.indicator,
      countryData: this.state.country,
      summaryData: this.props.summaryData
    });
  }
}

LTSExploreMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  fetchNDCSLTS: PropTypes.func.isRequired,
  query: PropTypes.object,
  summaryData: PropTypes.object,
  indicator: PropTypes.object,
  indicators: PropTypes.array
};

export default withRouter(
  connect(mapStateToProps, actions)(LTSExploreMapContainer)
);
