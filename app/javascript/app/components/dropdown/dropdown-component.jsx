import React, { PureComponent } from 'react';
import { ReactSelectize, SimpleSelect } from 'react-selectize'; // eslint-disable-line
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import { themr } from 'react-css-themr';
import cx from 'classnames';
import Loading from 'components/loading';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import infoIcon from 'assets/icons/info.svg';
import dropdownArrowWhite from 'assets/icons/dropdown-arrow-white.svg';

import theme from 'styles/themes/dropdown/react-selectize.scss';
import styles from './dropdown-styles.scss';

class Dropdown extends PureComponent {
  componentDidUpdate() {
    this.selectorElement.highlightFirstSelectableOption();
  }
  render() {
    const {
      white,
      label,
      transparent,
      plain,
      dark,
      blueBorder,
      wrapperClassName,
      className,
      disabled,
      colorDot,
      info,
      infoText,
      required,
      optional,
      disclaimer,
      hasSearch
    } = this.props;
    const arrow = this.props.white ? dropdownArrowWhite : dropdownArrow;
    const hasNotValue = this.props.value && !this.props.value.value;
    const isRequired = hasNotValue && required;
    return (
      <div
        className={cx(
          styles.dropdownWrapper,
          {
            [styles.flex]: colorDot,
            [styles.requiredError]: required && hasNotValue
          },
          wrapperClassName
        )}
      >
        {colorDot && (
          <span className={styles.dot} style={{ backgroundColor: colorDot }} />
        )}
        {label && <span className={styles.label}>{label}</span>}
        {isRequired && (
          <span className={styles.requiredError}>This field is required</span>
        )}
        {optional && <span className={styles.optional}>(optional)</span>}
        {info && (
          <div data-tip={infoText} className={styles.infoContainer}>
            <Icon icon={infoIcon} className={styles.infoIcon} />
          </div>
        )}
        <div
          className={cx(
            theme.dropdown,
            transparent ? theme.transparent : '',
            white ? theme.white : '',
            plain ? theme.plain : '',
            dark ? theme.dark : '',
            blueBorder ? theme.blueBorder : ''
          )}
        >
          {this.props.loading && <Loading className={styles.loader} mini />}
          <div
            className={cx(styles.dropdownDisclaimerWrapper, {
              withSearch: hasSearch
            })}
          >
            <SimpleSelect
              ref={el => {
                this.selectorElement = el;
              }}
              className={cx(className, disabled, {
                [styles.withDot]: colorDot
              })}
              renderToggleButton={() => <Icon icon={arrow} />}
              renderOption={option => (
                <div className={styles.optionItem}>
                  {option.targetsAmount && option.targetsAmount > 0 ? (
                    <span className={styles.bold}>{option.label}</span>
                  ) : (
                    option && option.label
                  )}
                </div>
              )}
              {...this.props}
            />
            {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.string,
  openUp: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  white: PropTypes.bool,
  plain: PropTypes.bool,
  dark: PropTypes.bool,
  info: PropTypes.bool,
  infoText: PropTypes.string,
  theme: PropTypes.object,
  hasSearch: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  blueBorder: PropTypes.bool,
  selectorRef: PropTypes.func,
  colorDot: PropTypes.string,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.object,
  disclaimer: PropTypes.string
};

export default themr('Dropdown', styles)(Dropdown);
