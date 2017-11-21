import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import PropTypes from 'prop-types';
import {
  filteredDataBySearch,
  titleLinks,
  getDefaultColumns
} from './emission-pathways-table-selectors';
import Component from './emission-pathways-table-component';

const mapStateToProps = (state, { category, location }) => {
  const search = qs.parse(location.search);
  const categoryData = state[`esp${category}`];
  const espData = {
    categoryData: categoryData.data,
    category,
    query: search.search
  };
  return {
    titleLinks: titleLinks(espData),
    data: filteredDataBySearch(espData),
    defaultColumns: getDefaultColumns(espData),
    categoryName: category,
    query: espData.query,
    loading: categoryData.loading
  };
};

class EmissionPathwaysTableComponent extends PureComponent {
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

EmissionPathwaysTableComponent.propTypes = {
  query: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(EmissionPathwaysTableComponent)
);
