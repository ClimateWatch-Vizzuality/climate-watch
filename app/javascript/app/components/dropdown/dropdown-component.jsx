import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import searchIcon from 'assets/icons/search.svg';

import 'react-select/dist/react-select.css';
import styles from './dropdown-styles.scss';

const Dropdown = props => (
  <div className={styles.dropdownWrapper}>
    {props.label && <span className={styles.label}>{props.label}</span>}
    <Select
      className={cx(
        styles.dropdown,
        { [styles.dropdownUp]: props.openUp },
        props.transparent ? styles.transparent : '',
        props.optionsAreLinks ? styles.hasLinks : ''
      )}
      {...props}
      arrowRenderer={({ isOpen }) => (
        <Icon
          className={
            props.search ? (
              styles.searchIcon
            ) : (
              cx({ [styles.isOpen]: props.openUp ? !isOpen : isOpen })
            )
          }
          icon={props.search ? searchIcon : dropdownArrow}
        />
      )}
      optionRenderer={option => (
        <div className={styles.optionContainer}>
          <div>{`${option.label}`}</div>
          {props.optionsAreLinks && (
            <div className={styles.iconArrow}>
              <Icon icon={dropdownArrow} />
            </div>
          )}
        </div>
      )}
    />
  </div>
);

Dropdown.propTypes = {
  label: PropTypes.string,
  openUp: PropTypes.bool,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  theme: PropTypes.object,
  search: PropTypes.bool,
  optionsAreLinks: PropTypes.bool
};

export default Dropdown;
