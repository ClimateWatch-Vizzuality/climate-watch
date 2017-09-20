import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { SortDirection } from 'react-virtualized';
import _sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

import Component from './table-component';

const getDataSorted = ({ data, sortBy, sortDirection }) => {
  const dataSorted = _sortBy(data, sortBy);
  return sortDirection === SortDirection.DESC
    ? reverse(dataSorted)
    : dataSorted;
};

class TableContainer extends PureComponent {
  constructor(props) {
    super(props);
    const data = props.data || [];
    const sortBy = props.data.length ? props.data[0].value : '';
    const sortDirection = SortDirection.ASC;
    const dataSorted = getDataSorted({ data, sortBy, sortDirection });

    this.state = {
      sortBy,
      sortDirection,
      data: dataSorted
    };
  }

  componentWillReceiveProps(nextProps) {
    const { sortBy, sortDirection } = this.state;
    const { data } = nextProps;
    const dataSorted = getDataSorted({ data, sortBy, sortDirection });

    this.setState({ data: dataSorted });
  }

  handleSort = ({ sortBy, sortDirection }) => {
    const { data } = this.state;
    const sortedData = getDataSorted({ data, sortBy, sortDirection });

    this.setState({ data: sortedData, sortBy, sortDirection });
  };

  render() {
    const { data, sortBy, sortDirection } = this.state;
    return createElement(Component, {
      ...this.props,
      data,
      sortBy,
      sortDirection,
      handleSort: this.handleSort
    });
  }
}

TableContainer.propTypes = {
  data: PropTypes.array.isRequired
};

TableContainer.defaultProps = {
  data: []
};

export default TableContainer;
