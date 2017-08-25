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

  render() {
    const indicators = this.props.indicators[this.props.selectedCategory] || [];
    return createElement(Component, {
      ...this.props,
      paths,
      indicators,
      handleCountryClick: this.handleCountryClick,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange
    });
  }
}

NDCMapContainer.propTypes = {
  indicators: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCMapContainer));
