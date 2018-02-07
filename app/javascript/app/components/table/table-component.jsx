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
      fullTextColumns,
      setOptionsOpen,
      setOptionsClose,
      toggleOptionsOpen,
      optionsOpen
    } = this.props;

    if (!data.length) return null;
    const hasColumnSelectedOptions = hasColumnSelect && columnsOptions;
    const getResponsiveWidth = width => {
      let ratio = 1;
      if (width < pixelBreakpoints.mobile) ratio = 2.5;
      else if (width < pixelBreakpoints.landscape) ratio = 1.75;
      return width * ratio;
    };

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
                width={getResponsiveWidth(width)}
                height={460}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
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
                    width={200}
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
  rowHeight: PropTypes.number.isRequired,
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
  rowHeight: 45,
  headerHeight: 30
};

export default SimpleTable;
