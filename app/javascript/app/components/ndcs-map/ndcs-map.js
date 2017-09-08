import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import paths from 'app/data/world-50m-paths';
import ReactTooltip from 'react-tooltip';

import Component from './ndcs-map-component';
import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator
} from './ndcs-map-selectors';

const mapStateToProps = (state, { location }) => {
  const { data } = state.ndcs;
  const search = qs.parse(location.search);
  const ndcsWithSelection = {
    ...data,
    categorySelected: search.category,
    indicatorSelected: search.indicator
  };

  return {
    categories: getCategories(ndcsWithSelection),
    indicators: getCategoryIndicators(ndcsWithSelection),
    selectedCategory: getSelectedCategory(ndcsWithSelection),
    selectedIndicator: getSelectedIndicator(ndcsWithSelection),
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
    fill: '#ECEFF1',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#ECEFF1',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
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

    return selectedIndicator.locations[geometryIdHover]
      ? selectedIndicator.locations[geometryIdHover].value
      : '';
  }

  handleCountryClick = geography => {
    this.props.history.push(`/ndcs/country/${geography.id}`);
  };

  handleCountryEnter = geometry => {
    this.setState({ geometryIdHover: geometry.id });
    ReactTooltip.rebuild();
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
    const { locations, legendBuckets } = this.props.selectedIndicator;
    const countryData = locations && locations[geography.id];

    if (countryData) {
      const legendData = legendBuckets[countryData.label_id];
      const color = legendData && legendData.color;
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
