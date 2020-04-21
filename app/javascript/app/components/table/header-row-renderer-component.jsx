import React from 'react';
import PropTypes from 'prop-types';
import idleSort from 'assets/icons/collapse.svg';
import Icon from 'components/icon';
import cx from 'classnames';
import styles from './table-styles.scss';

const headerRowRenderer = props => {
  const { className, columns, style, theme } = props;
  return (
    <div className={cx(className, theme.headerRow)} role="row" style={style}>
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
  style: PropTypes.object,
  theme: PropTypes.object
};

headerRowRenderer.defaultProps = {
  theme: {}
};

export default headerRowRenderer;
