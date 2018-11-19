import React from 'react';
import PropTypes from 'prop-types';
import idleSort from 'assets/icons/collapse.svg';
import Icon from 'components/icon';
import styles from './table-styles.scss';

const headerRowRenderer = props => {
  const { className, columns, style } = props;
  return (
    <div className={className} role="row" style={style}>
      {columns.map(c => {
        if (!c.props['aria-sort']) {
          c.props.children.push(
            <Icon icon={idleSort} className={styles.idleSortIcon} />
          );
        }
        return c;
      })}
    </div>
  );
};

headerRowRenderer.propTypes = {
  className: PropTypes.object,
  columns: PropTypes.array,
  style: PropTypes.object
};

export default headerRowRenderer;
