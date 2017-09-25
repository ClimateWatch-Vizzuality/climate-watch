import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import Component from './ndcs-map-component';
import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getPathsWithStyles
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
    paths: getPathsWithStyles(ndcsWithSelection),
    categories: getCategories(ndcsWithSelection),
    indicators: getCategoryIndicators(ndcsWithSelection),
    selectedCategory: getSelectedCategory(ndcsWithSelection),
    selectedIndicator: getSelectedIndicator(ndcsWithSelection)
  };
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
    if (!geometryIdHover || !selectedIndicator) return '';

    return selectedIndicator.locations[geometryIdHover]
      ? selectedIndicator.locations[geometryIdHover].value
      : '';
  }

  handleCountryClick = geography => {
    this.props.history.push(`/ndcs/country/${geography.id}`);
  };

  handleCountryEnter = geometry => {
    this.setState({ geometryIdHover: geometry.id });
  };

  handleCategoryChange = category => {
    this.updateUrlParam({
      name: 'category',
      value: category.value,
      clear: true
    });
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam({ name: 'indicator', value: indicator.value });
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
  }

  render() {
    const tooltipTxt = this.getTooltipText();
    return createElement(Component, {
      ...this.props,
      tooltipTxt,
      handleCountryClick: this.handleCountryClick,
      handleCountryEnter: this.handleCountryEnter,
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
