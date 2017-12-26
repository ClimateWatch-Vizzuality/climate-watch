import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import map from 'lodash/map';

import styles from './selectable-list-styles';

const SelectableList = ({ type, data = [], selected, onClick, children }) => (
  <ul className={styles[`${type}s`]}>
    {map(data, item => (
      <li
        key={item.id}
        className={cx(styles[type], {
          [styles[`${type}Selected`]]: selected === item.id
        })}
      >
        <button onClick={() => onClick(item.id)}>{children(item)}</button>
      </li>
    ))}
  </ul>
);

SelectableList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array,
  selected: PropTypes.string,
  onClick: PropTypes.any.isRequired,
  children: PropTypes.func
};

export default SelectableList;
