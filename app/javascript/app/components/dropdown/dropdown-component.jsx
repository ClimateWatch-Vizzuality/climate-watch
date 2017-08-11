import React from 'react';
import Select from 'react-select';
import Icon from 'components/icon';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import styles from './dropdown-styles.scss';

import 'react-select/dist/react-select.css';

const Dropdown = props =>
  (<Select
    className={styles.dropdown}
    {...props}
    arrowRenderer={() => <Icon className={styles.logo} icon={dropdownArrow} />}
  />);

export default Dropdown;
