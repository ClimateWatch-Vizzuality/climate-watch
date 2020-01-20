import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';

import fetchActions from 'pages/ndcs/ndcs-actions';
import { actions as modalActions } from 'components/modal-metadata';

import Component from './ndcs-explore-map-component';

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
  getSelectedCategory
} from './ndcs-explore-map-selectors';

const actions = { ...fetchActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcs;
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

  const ndcsExploreWithSelection = {
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
    query: ndcsExploreWithSelection.query,
    paths: getPathsWithStyles(ndcsExploreWithSelection),
    isoCountries: getISOCountries(ndcsExploreWithSelection),
    selectedIndicator: getMapIndicator(ndcsExploreWithSelection),
    emissionsCardData: getEmissionsCardData(ndcsExploreWithSelection),
    legendData: getLegend(ndcsExploreWithSelection),
    summaryCardData: getSummaryCardData(ndcsExploreWithSelection),
    downloadLink: getLinkToDataExplorer(ndcsExploreWithSelection),
    categories: getCategories(ndcsExploreWithSelection),
    indicators: getCategoryIndicators(ndcsExploreWithSelection),
    selectedCategory: getSelectedCategory(ndcsExploreWithSelection)
  };
};

class NDCSExploreMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  componentWillMount() {
    this.props.fetchNDCS();
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCountryClick = (geography, countryData) => {
    const { isoCountries } = this.props;
    const { id: iso, name } = countryData || {};
    const countryIso =
      iso || (geography && geography.properties && geography.properties.id);
    if (countryIso && isCountryIncluded(isoCountries, countryIso)) {
      this.props.history.push(`/ndcs/country/${countryIso}`);
      handleAnalytics(
        'NDCS Explore Map',
        'Use map to find country',
        name || geography.properties.name
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
    handleAnalytics('NDCS Explore Map', 'Change category', category.label);
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam({ name: 'indicator', value: indicator.value });
    handleAnalytics('NDCS Explore Map', 'Change indicator', indicator.label);
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      customTitle: 'NDCS Explore',
      category: 'NDCS Explore Map',
      slugs: ['ndc_cw', 'ndc_wb', 'ndc_die'],
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
      ? 'No resundcs found'
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
      indicator: this.props.indicator,
      countryData: this.state.country,
      summaryData: this.props.summaryData
    });
  }
}

NDCSExploreMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  fetchNDCS: PropTypes.func.isRequired,
  query: PropTypes.object,
  summaryData: PropTypes.array,
  indicator: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSExploreMapContainer)
);
