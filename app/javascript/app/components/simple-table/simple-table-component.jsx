import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './simple-table-styles.scss';

const SimpleTable = props => {
  const { data, theme } = props;
  const columns = data && data.length && Object.keys(data[0]);
  const columnWidth = columns && `${100 / columns.length}%`;
  return (
    columns && (
      <div>
        <div className={cx(styles.header, theme.header)}>
          {columns.map(key => (
            <span style={{ width: columnWidth }}>{key}</span>
          ))}
        </div>
        <div className={cx(styles.scroll, theme.scroll)}>
          <table>
            {data.map(row => (
              <tr>
                {columns.map(key => (
                  <td
                    className={theme.cell}
                    width={columnWidth}
                    dangerouslySetInnerHTML={{ __html: row[key] }}
                  />
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  );
};

SimpleTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})),
  theme: PropTypes.shape({})
};

SimpleTable.defaultProps = {
  theme: {}
};

export default SimpleTable;
