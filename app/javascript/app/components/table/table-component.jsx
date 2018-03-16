import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Column, Table, AutoSizer } from 'react-virtualized';
import MultiSelect from 'components/multiselect';
import cx from 'classnames';
import { pixelBreakpoints } from 'components/responsive';

import lowerCase from 'lodash/lowerCase';
import 'react-virtualized/styles.css'; // only needs to be imported once
import cellRenderer from './cell-renderer-component';
import styles from './table-styles.scss';

const minColumnWidth = 180;
const getResponsiveWidth = (columns, width) => {
  if (columns.length === 1) return width;

  const isMinColumSized = width / columns < minColumnWidth;

  let responsiveRatio = 1.4; // Mobile
  let responsiveColumnRatio = 0.2;
  if (width > pixelBreakpoints.portrait && width < pixelBreakpoints.landscape) {
    responsiveColumnRatio = 0.1;
    responsiveRatio = 1.2; // Tablet
  } else if (width > pixelBreakpoints.landscape) {
    // Desktop
    responsiveColumnRatio = 0.1;
    responsiveRatio = 1;
  }
  const columnRatio = isMinColumSized ? responsiveColumnRatio : 0;
  const columnExtraWidth = columnRatio * columns;
  return width * responsiveRatio * (1 + columnExtraWidth);
};

class SimpleTable extends PureComponent {
  render() {
    const {
      data,
      hasColumnSelect,
      activeColumns,
      columnsOptions,
      handleColumnChange,
      setRowsHeight,
      setColumnWidth,
      headerHeight,
      sortBy,
      sortDirection,
      handleSortChange,
      fullTextColumns,
      setOptionsOpen,
      setOptionsClose,
      toggleOptionsOpen,
      optionsOpen
    } = this.props;

    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    return (
      <div className={cx({ [styles.hasColumnSelect]: hasColumnSelect })}>
        {hasColumnSelectedOptions && (
          <div
            role="button"
            tabIndex={0}
            className={styles.columnSelectorWrapper}
            onTouchEnd={toggleOptionsOpen}
            onMouseEnter={setOptionsOpen}
            onMouseLeave={setOptionsClose}
          >
            <MultiSelect
              parentClassName={styles.columnSelector}
              values={activeColumns || []}
              options={columnsOptions || []}
              onMultiValueChange={handleColumnChange}
              hideResetButton
              open={optionsOpen}
            >
              <span className={styles.selectorValue}>...</span>
            </MultiSelect>
          </div>
        )}
        <div className={cx(styles.tableWrapper)}>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                className={styles.table}
                width={getResponsiveWidth(activeColumns.length, width)}
                height={460}
                headerHeight={headerHeight}
                // rowHeight={({ index }) => setRowsHeight(activeColumns, data, index)}
                rowHeight={setRowsHeight(activeColumns)}
                rowCount={data.length}
                sort={handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
                rowGetter={({ index }) => data[index]}
              >
                {activeColumns.map(c => c.value).map(column => (
                  <Column
                    className={cx(styles.column, {
                      [styles.fullText]:
                        fullTextColumns && fullTextColumns.indexOf(column) > -1
                    })}
                    key={column}
                    label={lowerCase(column)}
                    dataKey={column}
                    width={setColumnWidth(column)}
                    height={50}
                    flexGrow={1}
                    cellRenderer={cell =>
                      cellRenderer({ props: this.props, cell })}
                  />
                ))}
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.array,
  optionsOpen: PropTypes.bool,
  hasColumnSelect: PropTypes.bool,
  activeColumns: PropTypes.array,
  columnsOptions: PropTypes.array,
  handleColumnChange: PropTypes.func,
  setRowsHeight: PropTypes.func.isRequired,
  setColumnWidth: PropTypes.func.isRequired,
  headerHeight: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  setOptionsOpen: PropTypes.func.isRequired,
  setOptionsClose: PropTypes.func.isRequired,
  toggleOptionsOpen: PropTypes.func.isRequired,
  fullTextColumns: PropTypes.array // 'Columns with full text, no ellipsis'
};

SimpleTable.defaultProps = {
  headerHeight: 30
};

export default SimpleTable;
