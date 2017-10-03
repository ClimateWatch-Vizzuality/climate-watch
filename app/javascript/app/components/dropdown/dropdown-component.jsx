import React from 'react';
import { ReactSelectize, SimpleSelect } from 'react-selectize'; // eslint-disable-line
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import dropdownArrowWhite from 'assets/icons/dropdown-arrow-white.svg';
import searchIcon from 'assets/icons/search.svg';

import 'react-selectize/themes/index.css';
import styles from './dropdown-styles.scss';

const Dropdown = props => {
  const arrow = props.white ? dropdownArrowWhite : dropdownArrow;

  return (
    <div className={styles.dropdown}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <SimpleSelect
        {...props}
        className={cx(
          props.className,
          props.disabled,
          props.transparent ? styles.transparent : '',
          props.white ? styles.white : ''
        )}
        renderToggleButton={({ open }) => (
          <Icon
            className={cx(
              props.white && !open ? styles.whiteIcon : '',
              props.hasSearch ? styles.searchIcon : '',
              open && !props.hasSearch ? styles.isOpen : ''
            )}
            icon={props.hasSearch ? searchIcon : arrow}
          />
        )}
      />
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  openUp: PropTypes.bool,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  white: PropTypes.bool,
  theme: PropTypes.object,
  hasSearch: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Dropdown;
