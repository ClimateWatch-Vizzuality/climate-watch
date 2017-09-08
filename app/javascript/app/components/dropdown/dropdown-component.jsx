import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';
import dropdownArrow from 'assets/icons/dropdown-arrow.svg';

import 'react-select/dist/react-select.css';
import styles from './dropdown-styles.scss';

const Dropdown = props => (
  <div className={styles.dropdownWrapper}>
    {props.label && <span className={styles.label}>{props.label}</span>}
    <Select
      className={cx(
        styles.dropdown,
        { [styles.dropdownUp]: props.openUp },
        props.transparent ? styles.transparent : ''
      )}
      {...props}
      arrowRenderer={({ isOpen }) => (
        <Icon
          className={cx({ [styles.isOpen]: props.openUp ? !isOpen : isOpen })}
          icon={dropdownArrow}
        />
      )}
    />
  </div>
);

Dropdown.propTypes = {
  label: PropTypes.string,
  openUp: PropTypes.bool,
  className: PropTypes.string,
  transparent: PropTypes.bool
};

export default Dropdown;
