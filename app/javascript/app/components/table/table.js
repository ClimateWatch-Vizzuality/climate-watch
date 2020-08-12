import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { SortDirection } from 'react-virtualized';
import _sortBy from 'lodash/sortBy';
import omit from 'lodash/omit';
import reverse from 'lodash/reverse';
import isEqual from 'lodash/isEqual';
import { toStartCase } from 'app/utils';
import {
  ESP_HIGH_ROWS,
  ESP_MEDIUM_ROWS,
  ESP_NARROW_COLUMNS,
  ESP_WIDE_COLUMNS
} from 'data/constants';

import Component from './table-component';

const filterColumns = columns =>
  (columns
    ? columns
      .filter(d => !d.endsWith('NotShow'))
      .map(d => ({
        label: toStartCase(d),
        value: d
      }))
    : []);

class TableContainer extends PureComponent {
  constructor(props) {
    super(props);
    const {
      data,
      defaultColumns,
      sortBy,
      sortDirection,
      forcedColumnWidth,
      titleLinks
    } = props;
    const columns = defaultColumns || Object.keys(data[0]);
    this.state = {
      data,
      optionsOpen: false,
      forcedColumnWidth,
      sortBy: sortBy || Object.keys(data[0])[0],
      sortDirection,
      activeColumns: filterColumns(columns),
      columnsOptions: Object.keys(data[0])
        .filter(d => !d.endsWith('NotShow'))
        .map(d => ({
          label: toStartCase(d),
          value: d
        })),
      titleLinks
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data, titleLinks } = this.props;
    const columns = data ? Object.keys(data[0]) : [];
    if (
      !isEqual(nextProps.data !== data) ||
      !isEqual(nextProps.titleLinks, titleLinks)
    ) {
      this.setState({
        data: nextProps.data,
        titleLinks: nextProps.titleLinks,
        activeColumns: filterColumns(columns)
      });
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
    // If all data is the same don't sort the values
    if (
      data &&
      data[0][sortBy] &&
      !data.some(d => d[sortBy] !== data[0][sortBy])
    ) {
      return data;
    }

    const dataSorted = _sortBy(data, sortBy);
    return sortDirection === SortDirection.DESC
      ? reverse(dataSorted)
      : dataSorted;
  };

  toggleOptionsOpen = () => {
    this.setState(state => ({ optionsOpen: !state.optionsOpen }));
  };

  handleSortChange = ({ sortBy, sortDirection }) => {
    const { data, titleLinks } = this.state;
    const dataWithTitleLinks = [...data];
    this.setState({ data: sortedData, sortBy, sortDirection });
    data.forEach((d, i) => {
      if (titleLinks) {
        dataWithTitleLinks[i].titleLink = titleLinks[i];
      }
    });
    const sortedData = this.getDataSorted(
      dataWithTitleLinks,
      sortBy,
      sortDirection
    );

    const sortedDataWithoutTitleLinks = [];
    const sortedTitleLinks = [];
    sortedData.forEach(d => {
      sortedDataWithoutTitleLinks.push(omit(d, ['titleLink']));
      sortedTitleLinks.push(d.titleLink);
    });
    this.setState({
      data: sortedDataWithoutTitleLinks,
      titleLinks: sortedTitleLinks,
      sortBy,
      sortDirection
    });
  };

  handleColumnChange = columns => {
    this.setState({ activeColumns: columns });
  };

  render() {
    const {
      data,
      titleLinks,
      sortBy,
      sortDirection,
      activeColumns,
      columnsOptions,
      optionsOpen
    } = this.state;
    const { handleSortChange, setRowsHeight, setColumnWidth } = this.props;
    return createElement(Component, {
      ...this.props,
      data,
      titleLinks,
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
  titleLinks: PropTypes.array,
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
