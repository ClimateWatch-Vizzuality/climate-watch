import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { SortDirection } from 'react-virtualized';
import _sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import { toStartCase } from 'app/utils';
import {
  ESP_HIGH_ROWS,
  ESP_MEDIUM_ROWS,
  ESP_NARROW_COLUMNS,
  ESP_WIDE_COLUMNS
} from 'data/constants';

import Component from './table-component';

class TableContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { data, defaultColumns, sortBy, sortDirection, forcedColumnWidth } = props;
    const columns = defaultColumns || Object.keys(data[0]);
    this.state = {
      data,
      optionsOpen: false,
      forcedColumnWidth,
      sortBy: sortBy || Object.keys(data[0])[0],
      sortDirection,
      activeColumns: columns.filter(d => !d.endsWith('NotShow')).map(d => ({
        label: toStartCase(d),
        value: d
      })),
      columnsOptions: Object.keys(data[0])
        .filter(d => !d.endsWith('NotShow'))
        .map(d => ({
          label: toStartCase(d),
          value: d
        }))
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  }

  setRowsHeight = columns => {
    if (columns.find(c => ESP_HIGH_ROWS.indexOf(c.value) > -1)) {
      return 200;
    } else if (columns.find(c => ESP_MEDIUM_ROWS.indexOf(c.value) > -1)) {
      return 80;
    }
    return 60;
  };

  setColumnWidth = column => {
    if (this.props.forcedColumnWidth) {
      return this.props.forcedColumnWidth;
    }
    if (ESP_NARROW_COLUMNS.indexOf(column) !== -1) {
      return 80;
    }
    if (ESP_WIDE_COLUMNS.indexOf(column) !== -1) {
      return 400;
    }
    return 200;
  };

  setOptionsClose = () => {
    this.setState({ optionsOpen: false });
  };

  setOptionsOpen = () => {
    this.setState({ optionsOpen: true });
  };

  getDataSorted = (data, sortBy, sortDirection) => {
    const dataSorted = _sortBy(data, sortBy);
    return sortDirection === SortDirection.DESC ? reverse(dataSorted) : dataSorted;
  };

  toggleOptionsOpen = () => {
    this.setState(state => ({ optionsOpen: !state.optionsOpen }));
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
    const { data, sortBy, sortDirection, activeColumns, columnsOptions, optionsOpen } = this.state;
    const { handleSortChange, setRowsHeight, setColumnWidth } = this.props;
    return createElement(Component, {
      ...this.props,
      data,
      sortBy,
      optionsOpen,
      sortDirection,
      activeColumns,
      columnsOptions,
      handleSortChange: handleSortChange || this.handleSortChange,
      handleColumnChange: this.handleColumnChange,
      setRowsHeight: setRowsHeight || this.setRowsHeight,
      setColumnWidth: setColumnWidth || this.setColumnWidth,
      setOptionsOpen: this.setOptionsOpen,
      setOptionsClose: this.setOptionsClose,
      toggleOptionsOpen: this.toggleOptionsOpen
    });
  }
}

TableContainer.propTypes = {
  data: PropTypes.array.isRequired,
  defaultColumns: PropTypes.array,
  handleSortChange: PropTypes.func,
  setRowsHeight: PropTypes.func,
  setColumnWidth: PropTypes.func,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  forcedColumnWidth: PropTypes.number
};

TableContainer.defaultProps = {
  data: [],
  sortBy: 'value',
  sortDirection: SortDirection.ASC,
  hasStrechedColumns: null
};

export default TableContainer;
