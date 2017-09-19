import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import styles from './table-styles.scss';

const SimpleTable = props => {
  const { data } = props;
  if (!data.length) return null;

  const columns = Object.keys(data[0]);
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          className={styles.table}
          width={width}
          height={300}
          headerHeight={20}
          rowHeight={30}
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
  data: PropTypes.array
};

SimpleTable.defaultProps = {
  data: []
};

export default SimpleTable;
