import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import styles from './table-styles.scss';

const SimpleTable = props => {
  const { data, rowHeight, headerHeight } = props;
  if (!data.length) return null;

  const columns = Object.keys(data[0]);
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          className={styles.table}
          width={width}
          height={460}
          headerHeight={headerHeight}
          rowHeight={rowHeight}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
        >
          {columns.map(column => (
            <Column
              className={styles.column}
              key={column}
              label={column}
              dataKey={column}
              width={300}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

SimpleTable.propTypes = {
  data: PropTypes.array,
  rowHeight: PropTypes.number.isRequired,
  headerHeight: PropTypes.number.isRequired
};

SimpleTable.defaultProps = {
  data: [],
  rowHeight: 45,
  headerHeight: 30
};

export default SimpleTable;
