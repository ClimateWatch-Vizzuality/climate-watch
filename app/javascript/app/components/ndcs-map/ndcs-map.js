import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import paths from 'app/data/world-50m-paths';

import Component from './ndcs-map-component';
import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator
} from './ndcs-map-selectors';

const mapStateToProps = (state, { location }) => {
  const { ndcs } = state;
  const search = qs.parse(location.search);
  const ndcsWithRouter = {
    ...ndcs,
    category: search.category,
    indicator: search.indicator
  };

  return {
    categories: getCategories(ndcs),
    indicators: getCategoryIndicators(ndcs),
    selectedCategory: getSelectedCategory(ndcsWithRouter),
    selectedIndicator: getSelectedIndicator(ndcsWithRouter),
    paths
  };
};

const countryStyles = {
  default: {
    fill: '#ECEFF1',
    fillOpacity: 0.3,
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: '#ffc735',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#ffc735',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  }
};

const getChoroplethColor = vis => {
  switch (vis) {
    case 1:
      return '#d54d60';
    case 2:
      return '#eebc8f';
    case 3:
      return '#fee08d';
    case 4:
      return '#7aabd3';
    case 5:
      return '#25597c';
    case 6:
      return '#3c4483';
    default:
      return '#a4c74c';
  }
};

class NDCMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null
    };
  }

  getTooltipText() {
    const { geometryIdHover } = this.state;
    const { selectedIndicator } = this.props;
    if (!geometryIdHover) return '';

    return selectedIndicator.countries[geometryIdHover]
      ? selectedIndicator.countries[geometryIdHover].txt
      : '';
  }

  handleCountryClick = geography => {
    this.props.history.push(`/ndcs/country/${geography.id}`);
  };

  handleCountryEnter = geometry => {
    this.setState({ geometryIdHover: geometry.id });
  };

  handleCountryLeave = () => {
    this.setState({ geometryIdHover: null });
  };

  handleCategoryChange = category => {
    this.updateUrlParam('category', category.value, true);
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam('indicator', indicator.value);
  };

  updateUrlParam(param, value, clear = false) {
    const { history, location } = this.props;
    const search = qs.parse(location.search);
    const newSearch = clear
      ? { [param]: value }
      : {
        ...search,
        [param]: value
      };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  }

  computedStyles = geography => {
    const { countries } = this.props.selectedIndicator;
    if (countries && countries[geography.id]) {
      const color = getChoroplethColor(countries[geography.id].vis);
      return {
        ...countryStyles,
        default: {
          ...countryStyles.default,
          fill: color,
          fillOpacity: 0.9
        },
        hover: {
          ...countryStyles.hover,
          fill: color,
          fillOpacity: 1
        }
      };
    }
    return countryStyles;
  };

  render() {
    const tooltipTxt = this.getTooltipText();
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      computedStyles: this.computedStyles,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
      handleCountryLeave: this.handleCountryLeave,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange
    });
  }
}

NDCMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  selectedIndicator: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCMapContainer));
