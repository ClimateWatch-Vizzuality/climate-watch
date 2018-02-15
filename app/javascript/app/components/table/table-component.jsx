import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Column, Table, AutoSizer } from 'react-virtualized';
import MultiSelect from 'components/multiselect';
import cx from 'classnames';
import { LineChart, Line } from 'recharts';

import lowerCase from 'lodash/lowerCase';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { NavLink } from 'react-router-dom';
import styles from './table-styles.scss';

class SimpleTable extends PureComponent {
  render() {
    const {
      data,
      hasColumnSelect,
      activeColumns,
      columnsOptions,
      handleColumnChange,
      rowHeight,
      headerHeight,
      sortBy,
      sortDirection,
      handleSortChange,
      parseHtml,
      titleLinks,
      trendLine
    } = this.props;

    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    const renderTrendLine = chartData => (
      <LineChart width={70} height={35} data={chartData}>
        <Line dot={false} dataKey="value" stroke="#113750" strokeWidth={2} />
      </LineChart>
    );
    return (
      <div
        className={cx(
          styles.tableWrapper,
          hasColumnSelect ? styles.hasColumnSelect : ''
        )}
      >
        {hasColumnSelectedOptions && (
          <MultiSelect
            parentClassName={styles.columnSelector}
            values={activeColumns || []}
            options={columnsOptions || []}
            onMultiValueChange={handleColumnChange}
            hideResetButton
          >
            <span className={styles.selectorValue}>...</span>
          </MultiSelect>
        )}
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              className={styles.table}
              width={width}
              height={460}
              headerHeight={headerHeight}
              rowHeight={rowHeight}
              rowCount={data.length}
              sort={handleSortChange}
              sortBy={sortBy}
              sortDirection={sortDirection}
              rowGetter={({ index }) => data[index]}
            >
              {activeColumns.map(c => c.value).map((column, i) => {
                const flexGrow = i === 0 ? 0 : 1;
                return (
                  <Column
                    className={styles.column}
                    key={column}
                    label={lowerCase(column)}
                    dataKey={column}
                    width={200}
                    flexGrow={flexGrow}
                    cellRenderer={cell => {
                      const titleLink = titleLinks && titleLinks[cell.rowIndex];
                      if (trendLine && cell.dataKey === trendLine) {
                        return renderTrendLine(cell.cellData);
                      }

                      if (titleLink && cell.dataKey === titleLink.fieldName) {
                        return (
                          <NavLink to={titleLink.url}>{cell.cellData}</NavLink>
                        );
                      }
                      return parseHtml ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: cell.cellData }} // eslint-disable-line react/no-danger
                        />
                      ) : (
                        cell.cellData
                      );
                    }}
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.array,
  hasColumnSelect: PropTypes.bool,
  activeColumns: PropTypes.array,
  columnsOptions: PropTypes.array,
  handleColumnChange: PropTypes.func,
  rowHeight: PropTypes.number.isRequired,
  headerHeight: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  titleLinks: PropTypes.array, // {fieldName: 'title field name in the table', url:'/destination-url-for-the-link'}
  trendLine: PropTypes.string, // 'field name of the trend line column'
  parseHtml: PropTypes.bool
};

SimpleTable.defaultProps = {
  rowHeight: 45,
  headerHeight: 30
};

export default SimpleTable;
