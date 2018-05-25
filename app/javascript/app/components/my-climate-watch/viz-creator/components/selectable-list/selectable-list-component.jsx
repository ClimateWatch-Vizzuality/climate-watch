import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import map from 'lodash/map';

import styles from './selectable-list-styles';

const SelectableList = ({
  type,
  data = [],
  selected,
  onClick,
  children,
  className
}) => (
  <ul className={cx(styles.container, styles[`${type}s`], className)}>
    {map(data, item => (
      <li
        key={item.id}
        className={cx(styles.card, styles[type], {
          [styles.cardDisabled]: item.disabled,
          [styles[`${type}Selected`]]: selected === item.id
        })}
      >
        <button
          className={styles.button}
          onClick={() => !item.disabled && onClick(item.id)}
        >
          {children(item)}
        </button>
      </li>
    ))}
  </ul>
);

SelectableList.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  data: PropTypes.array,
  selected: PropTypes.string,
  onClick: PropTypes.any.isRequired,
  children: PropTypes.func
};

export default SelectableList;
