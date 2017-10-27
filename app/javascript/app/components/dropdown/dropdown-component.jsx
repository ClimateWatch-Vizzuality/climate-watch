import React from 'react';
import { ReactSelectize, SimpleSelect } from 'react-selectize'; // eslint-disable-line
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import dropdownArrowWhite from 'assets/icons/dropdown-arrow-white.svg';

import theme from 'styles/themes/dropdown/react-selectize.scss';
import styles from './dropdown-styles.scss';

const Dropdown = props => {
  const arrow = props.white ? dropdownArrowWhite : dropdownArrow;

  return (
    <div className={styles.dropdownWrapper}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <div
        className={cx(
          theme.dropdown,
          props.transparent ? theme.transparent : '',
          props.white ? theme.white : '',
          props.plain ? theme.plain : '',
          props.dark ? theme.dark : '',
          props.blueBorder ? theme.blueBorder : ''
        )}
      >
        <SimpleSelect
          className={cx(props.className, props.disabled)}
          renderToggleButton={() => <Icon icon={arrow} />}
          {...props}
        />
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  openUp: PropTypes.bool,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  white: PropTypes.bool,
  plain: PropTypes.bool,
  dark: PropTypes.bool,
  theme: PropTypes.object,
  hasSearch: PropTypes.bool,
  disabled: PropTypes.bool,
  blueBorder: PropTypes.bool
};

export default themr('Dropdown', styles)(Dropdown);
