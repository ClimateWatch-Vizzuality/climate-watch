/* eslint-disable no-mixed-operators */
import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { setColumnWidth } from 'utils/table';

import Component from './net-zero-table-component';

import {
  getISOCountries,
  removeIsoFromData,
  getDefaultColumns,
  getTitleLinks,
  getExtraColumn
} from './net-zero-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.LTS;
  const { countries } = state;
  const search = qs.parse(location.search);

  const LTSWithSelection = {
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
    query: LTSWithSelection.query,
    isoCountries: getISOCountries(LTSWithSelection),
    tableData: removeIsoFromData(LTSWithSelection),
    columns: getDefaultColumns(LTSWithSelection),
    titleLinks: getTitleLinks(LTSWithSelection),
    extraColumn: getExtraColumn(LTSWithSelection)
  };
};

class NetZeroTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setColumnWidth = column => {
    const { extraColumn } = this.props;
    return setColumnWidth({
      column,
      columns: this.props.columns,
      tableWidth: 1100,
      narrowColumnWidth: extraColumn ? 100 : 120,
      wideColumnWidth: extraColumn ? 290 : 400,
      narrowColumns: extraColumn ? [0, 4, 5] : [0, 3, 4],
      wideColumns: extraColumn ? [2] : [1]
    });
  };

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
      tableData: this.props.tableData,
      setColumnWidth: this.setColumnWidth
    });
  }
}

NetZeroTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  query: PropTypes.object,
  extraColumn: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, null)(NetZeroTableContainer)
);
