import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';

import Component from './ndcs-search-map-component';
import {
  getPathsWithStyles,
  getIncludedDocumentsCount,
  getIncludedCountriesCount,
  getTotalDocumentsNumber,
  getTotalCountriesNumber
} from './ndcs-search-map-selectors';

const mapStateToProps = (state, { location }) => {
  const { ndcSearch } = state;
  const search = qs.parse(location.search);
  const ndcsSearchData = {
    data: ndcSearch.data && ndcSearch.data.ndcs,
    meta: ndcSearch.data && ndcSearch.data.meta,
    loading: ndcSearch.loading,
    search,
    countriesData: state.countries.data,
    zoom: state.map.zoom
  };
  return {
    paths: getPathsWithStyles(ndcsSearchData),
    includedDocumentsNumber: getIncludedDocumentsCount(ndcsSearchData),
    includedCountriesNumber: getIncludedCountriesCount(ndcsSearchData),
    totalDocumentsNumber: getTotalDocumentsNumber(ndcsSearchData),
    totalCountriesNumber: getTotalCountriesNumber(ndcsSearchData),
    loading: state.ndcSearch.loading
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
    const iso = geography.properties && geography.properties.id;
    if (iso) {
      this.props.history.push(`/ndcs/country/${iso}`);
    }
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
