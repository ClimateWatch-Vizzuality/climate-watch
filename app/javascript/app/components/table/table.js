import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { SortDirection } from 'react-virtualized';
import _sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

import Component from './table-component';

class TableContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { data, defaultColumns } = props;
    this.state = {
      data,
      sortBy: Object.keys(data[0])[0],
      sortDirection: SortDirection.ASC,
      activeColumns: defaultColumns.map(d => ({
        label: upperFirst(lowerCase(d)),
        value: d
      })),
      columnsOptions: Object.keys(data[0]).map(d => ({
        label: upperFirst(lowerCase(d)),
        value: d
      }))
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  }

  getDataSorted = (data, sortBy, sortDirection) => {
    const dataSorted = _sortBy(data, sortBy);
    return sortDirection === SortDirection.DESC
      ? reverse(dataSorted)
      : dataSorted;
  };

  handleSortChange = ({ sortBy, sortDirection }) => {
    const { data } = this.state;
    const sortedData = this.getDataSorted(data, sortBy, sortDirection);
    this.setState({ data: sortedData, sortBy, sortDirection });
  };

  handleColumnChange = columns => {
    this.setState({ activeColumns: columns });
  };

  render() {
    const {
      data,
      sortBy,
      sortDirection,
      activeColumns,
      columnsOptions
    } = this.state;
    return createElement(Component, {
      ...this.props,
      data,
      sortBy,
      sortDirection,
      activeColumns,
      columnsOptions,
      handleSortChange: this.handleSortChange,
      handleColumnChange: this.handleColumnChange
    });
  }
}

TableContainer.propTypes = {
  data: PropTypes.array.isRequired,
  defaultColumns: PropTypes.array
};

TableContainer.defaultProps = {
  data: [],
  sortBy: 'value'
};

export default TableContainer;
