import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import paths from 'app/data/world-50m-paths';
import Component from './ndcs-map-component';
import {
  getCategories,
  getIndicators,
  getSelectedCategory,
  getSelectedIndicator
} from './ndcs-map-selectors';

const mapStateToProps = (state) => {
  const { ndcs } = state;
  return {
    categories: getCategories(ndcs),
    indicators: getIndicators(ndcs),
    selectedCategory: getSelectedCategory(ndcs),
    selectedIndicator: getSelectedIndicator(ndcs)
  };
};

const countryStyles = {
  default: {
    fill: '#ECEFF1',
    fillOpacity: 0.3,
    stroke: '#396d90',
    strokeWidth: 0.7,
    outline: 'none'
  },
  hover: {
    fill: '#ffc735',
    stroke: '#396d90',
    strokeWidth: 0.7,
    outline: 'none'
  },
  pressed: {
    fill: '#ffc735',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  }
};

const activeCountryStyles = {
  ...countryStyles,
  default: {
    ...countryStyles.defaut,
    fill: '#ffc735',
    fillOpacity: 1
  }
};

class NDCMapContainer extends PureComponent {
  handleCountryClick = (geography) => {
    this.props.history.push(`ndcs/country/${geography.id}`);
  };

  handleCategoryChange = (category) => {
    console.info(category);
  };

  handleIndicatorChange = (indicator) => {
    console.info(indicator);
  };

  computedStyles = (geography) => {
    const { countries } = this.props.selectedIndicator;
    if (countries && countries[geography]) {
      return activeCountryStyles;
    }
    return countryStyles;
  };

  render() {
    const indicators =
      this.props.indicators[this.props.selectedCategory.value] || [];
    return createElement(Component, {
      ...this.props,
      paths,
      indicators,
      computedStyles: this.computedStyles,
      handleCountryClick: this.handleCountryClick,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange
    });
  }
}

NDCMapContainer.propTypes = {
  history: PropTypes.object.isRequired,
  indicators: PropTypes.object.isRequired,
  selectedCategory: PropTypes.object.isRequired,
  selectedIndicator: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCMapContainer));
