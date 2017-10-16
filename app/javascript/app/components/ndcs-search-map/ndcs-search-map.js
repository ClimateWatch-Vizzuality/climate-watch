import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Component from './ndcs-search-map-component';
import {
  getPathsWithStyles,
  getCountriesIncluded
} from './ndcs-search-map-selectors';

const mapStateToProps = state => {
  const { ndcSearch } = state;

  return {
    paths: getPathsWithStyles(ndcSearch),
    countriesIncluded: getCountriesIncluded(ndcSearch)
  };
};

class NDCSearchMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      geometryIdHover: null
    };
  }

  handleCountryClick = geography => {
    this.props.history.push(`/ndcs/country/${geography.id}`);
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleCountryClick: this.handleCountryClick
    });
  }
}

NDCSearchMapContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCSearchMapContainer));
