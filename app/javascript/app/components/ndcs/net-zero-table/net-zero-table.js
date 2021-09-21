/* eslint-disable no-mixed-operators */
import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import Component from './net-zero-table-component';

import {
  getISOCountries,
  replaceAbbreviations,
  getDefaultColumns,
  getTitleLinks
} from './net-zero-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.NetZero;
  const { countries } = state;
  const search = qs.parse(location.search);

  const NetZeroWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    categorySelected: search.category,
    indicatorSelected: search.indicator,
    categories: data.categories,
    emissions: state.emissions,
    search
  };
  return {
    loading,
    query: NetZeroWithSelection.query,
    isoCountries: getISOCountries(NetZeroWithSelection),
    tableData: replaceAbbreviations(NetZeroWithSelection),
    columns: getDefaultColumns(NetZeroWithSelection),
    titleLinks: getTitleLinks(NetZeroWithSelection)
  };
};

class NetZeroTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      tableData: this.props.tableData
    });
  }
}

NetZeroTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  query: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, null)(NetZeroTableContainer)
);
