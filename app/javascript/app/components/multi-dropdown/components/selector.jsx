import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'cw-components';
import cx from 'classnames';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import closeIcon from 'assets/icons/close.svg';
import styles from '../multi-dropdown-styles.scss';

const Selector = props => {
  const {
    isOpen,
    disabled,
    arrowPosition,
    onSelectorClick,
    clearable,
    activeValue,
    activeLabel,
    searchable,
    inputProps,
    handleClearSelection,
    children,
    innerRef,
    placeholder,
    values
  } = props;
  const showCloseIcon = clearable && activeValue;
  const showDownArrow = arrowPosition !== 'left' && !disabled;
  const valuesSelectedLength = values.length;
  return (
    <div
      ref={innerRef}
      className={cx(styles.container, { [styles.isOpen]: isOpen })}
    >
      <div
        className={cx(styles.selector, {
          [styles.alignLeft]: arrowPosition,
          [styles.disabled]: disabled
        })}
      >
        {arrowPosition === 'left' && (
          <button
            className={styles.arrowBtn}
            onClick={onSelectorClick}
            type="button"
          >
            <Icon className={styles.arrow} icon={arrowDownIcon} />
          </button>
        )}
        <span
          className={cx(styles.value, {
            [styles.noValue]: !activeValue,
            [styles.clearable]: clearable,
            [styles.placeholder]: !isOpen && !activeLabel
          })}
        >
          {(isOpen && !searchable) || !isOpen ? (
            activeLabel || placeholder || `${valuesSelectedLength} selected`
          ) : (
            ''
          )}
        </span>
        <input {...inputProps()} />
        {showCloseIcon && (
          <button
            className={styles.clearBtn}
            onClick={handleClearSelection}
            type="button"
          >
            <Icon icon={closeIcon} className={styles.clearIcon} />
          </button>
        )}
        {showDownArrow && (
          <button
            className={styles.arrowBtn}
            onClick={onSelectorClick}
            type="button"
          >
            <Icon className={styles.arrow} icon={arrowDownIcon} />
          </button>
        )}
      </div>
      <div className={styles.menuArrow} />
      {children}
    </div>
  );
};

Selector.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  arrowPosition: PropTypes.string,
  onSelectorClick: PropTypes.func,
  clearable: PropTypes.bool,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchable: PropTypes.bool,
  inputProps: PropTypes.func,
  handleClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  innerRef: PropTypes.func,
  values: PropTypes.array
};

Selector.defaultProps = {
  children: undefined,
  isOpen: undefined,
  disabled: false,
  arrowPosition: undefined,
  onSelectorClick: undefined,
  clearable: false,
  activeValue: undefined,
  activeLabel: undefined,
  searchable: false,
  inputProps: undefined,
  handleClearSelection: undefined,
  placeholder: undefined,
  innerRef: undefined,
  values: []
};

export default Selector;
