import React, { PureComponent } from 'react';
import { ReactSelectize, SimpleSelect } from 'react-selectize'; // eslint-disable-line
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import dropdownArrowWhite from 'assets/icons/dropdown-arrow-white.svg';

import theme from 'styles/themes/dropdown/react-selectize.scss';
import styles from './dropdown-styles.scss';

class Dropdown extends PureComponent {
  componentDidUpdate() {
    this.selectorElement.highlightFirstSelectableOption();
  }

  render() {
    const arrow = this.props.white ? dropdownArrowWhite : dropdownArrow;
    return (
      <div className={styles.dropdownWrapper}>
        {this.props.label && (
          <span className={styles.label}>{this.props.label}</span>
        )}
        <div
          className={cx(
            theme.dropdown,
            this.props.transparent ? theme.transparent : '',
            this.props.white ? theme.white : '',
            this.props.plain ? theme.plain : '',
            this.props.dark ? theme.dark : '',
            this.props.blueBorder ? theme.blueBorder : ''
          )}
        >
          <SimpleSelect
            ref={el => {
              this.selectorElement = el;
            }}
            className={cx(this.props.className, this.props.disabled)}
            renderToggleButton={() => <Icon icon={arrow} />}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

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
  blueBorder: PropTypes.bool,
  selectorRef: PropTypes.func
};

export default themr('Dropdown', styles)(Dropdown);
