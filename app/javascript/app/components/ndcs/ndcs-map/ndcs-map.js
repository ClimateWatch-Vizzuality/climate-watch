import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import ReactGA from 'react-ga';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

import { actions as fetchActions } from 'pages/ndcs';
import { actions as modalActions } from 'components/modal-metadata';

import Component from './ndcs-map-component';

import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getPathsWithStyles,
  getISOCountries
} from './ndcs-map-selectors';

const actions = { ...fetchActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcs;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsWithSelection = {
    ...data,
    countries: countries.data,
    categorySelected: search.category,
    indicatorSelected: search.indicator
  };
  return {
    loading,
    paths: getPathsWithStyles(ndcsWithSelection),
    categories: getCategories(ndcsWithSelection),
    isoCountries: getISOCountries(ndcsWithSelection),
    indicators: getCategoryIndicators(ndcsWithSelection),
    selectedCategory: getSelectedCategory(ndcsWithSelection),
    selectedIndicator: getSelectedIndicator(ndcsWithSelection)
  };
};

class NDCMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null,
      country: null
    };
  }

  componentWillMount() {
    this.props.fetchNDCSMapIndicators();
  }

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { selectedIndicator } = this.props;
    if (!geometryIdHover || !selectedIndicator) return '';

    const isEuropeanCountry = europeanCountries.includes(geometryIdHover);
    const id = isEuropeanCountry ? europeSlug : geometryIdHover;
    return selectedIndicator.locations && selectedIndicator.locations[id]
      ? selectedIndicator.locations[id].value
      : 'Not Applicable';
  }

  handleCountryClick = geography => {
    const { isoCountries } = this.props;
    const iso = geography.properties && geography.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      this.props.history.push(`/ndcs/country/${iso}`);
      ReactGA.event({
        category: 'NDC Content Map',
        action: 'Use map to find country',
        label: geography.properties.name
      });
    }
  };

  handleCountryEnter = geography => {
    const iso = geography.properties && geography.properties.id;
    if (iso) this.setState({ geometryIdHover: iso });
    this.setState({ country: geography.properties });
  };

  handleCategoryChange = category => {
    this.updateUrlParam(
      {
        name: 'category',
        value: category.value
      },
      true
    );
    ReactGA.event({
      category: 'NDC Content Map',
      action: 'Change category',
      label: category.label
    });
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam({ name: 'indicator', value: indicator.value });
    ReactGA.event({
      category: 'NDC Content Map',
      action: 'Change indicator',
      label: indicator.label
    });
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      customTitle: 'NDC Content',
      category: 'NDC Content Map',
      slugs: ['ndc_cait', 'ndc_wb'],
      open: true
    });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  render() {
    const tooltipTxt = this.getTooltipText();
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange,
      handleInfoClick: this.handleInfoClick,
      countryData: this.state.country
    });
  }
}

NDCMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isoCountries: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  fetchNDCSMapIndicators: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, actions)(NDCMapContainer));
