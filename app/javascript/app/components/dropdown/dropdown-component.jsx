import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';
import dropdownArrow from 'assets/icons/dropdown-arrow.svg';

import 'react-select/dist/react-select.css';
import styles from './dropdown-styles.scss';

const Dropdown = props =>
  (<div>
    {props.label &&
      <span className={styles.label}>
        {props.label}
      </span>}
    <Select
      className={styles.dropdown}
      {...props}
      arrowRenderer={({ isOpen }) =>
        (<Icon
          className={cx({ [styles.isOpen]: isOpen })}
          icon={dropdownArrow}
        />)}
    />
  </div>);

Dropdown.propTypes = {
  label: PropTypes.string
};

export default Dropdown;
