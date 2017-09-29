import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import dropdownArrowWhite from 'assets/icons/dropdown-arrow-white.svg';
import searchIcon from 'assets/icons/search.svg';

import 'react-select/dist/react-select.css';
import styles from './dropdown-styles.scss';

const Dropdown = props => {
  const arrow = props.white ? dropdownArrowWhite : dropdownArrow;

  return (
    <div className={styles.dropdownWrapper}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <Select
        {...props}
        className={cx(
          styles.dropdown,
          { [styles.dropdownUp]: props.openUp },
          props.transparent ? styles.transparent : '',
          props.white ? styles.white : '',
          props.className
        )}
        arrowRenderer={({ isOpen }) => (
          <Icon
            className={
              props.search ? (
                styles.searchIcon
              ) : (
                cx({ [styles.isOpen]: props.openUp ? !isOpen : isOpen })
              )
            }
            icon={props.search ? searchIcon : arrow}
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
  search: PropTypes.bool
};

export default Dropdown;
