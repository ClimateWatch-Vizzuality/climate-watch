import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import PropTypes from 'prop-types';
import {
  filteredDataBySearch,
  sortBy,
  titleLinks
} from './emission-pathways-model-table-selectors';
import Component from './emission-pathways-model-table-component';

const mapStateToProps = (state, { category }) => {
  const search = qs.parse(location.search);
  const categoryData = state[`esp${category}`];

  const EspData = {
    categoryData,
    category,
    query: search.search
  };

  return {
    data: filteredDataBySearch(EspData),
    sortBy: sortBy(EspData),
    titleLinks: titleLinks(EspData),
    query: EspData.query,
    categoryName: category,
    loading: categoryData.loading
  };
};

class EmissionPathwaysModelTableComponent extends PureComponent {
  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
  }

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this section';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange
    });
  }
}

EmissionPathwaysModelTableComponent.propTypes = {
  query: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(EmissionPathwaysModelTableComponent)
);
