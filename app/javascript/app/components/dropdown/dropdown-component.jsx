import React from 'react';
import Select from 'react-select';
import Icon from 'components/icon';
import cx from 'classnames';
import dropdownArrow from 'assets/icons/dropdown-arrow.svg';

import 'react-select/dist/react-select.css';
import styles from './dropdown-styles.scss';

const Dropdown = props =>
  (<Select
    className={styles.dropdown}
    {...props}
    arrowRenderer={({ isOpen }) =>
      <Icon className={cx({ [styles.isOpen]: isOpen })} icon={dropdownArrow} />}
  />);

export default Dropdown;
