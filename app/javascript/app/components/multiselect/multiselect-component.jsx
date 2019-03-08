import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactSelectize, MultiSelect } from 'react-selectize'; // eslint-disable-line
import Loading from 'components/loading';
import Icon from 'components/icon';
import { themr } from 'react-css-themr';
import cx from 'classnames';
import { ALL_SELECTED } from 'data/constants';
import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import infoIcon from 'assets/icons/info.svg';
import theme from 'styles/themes/dropdown/react-selectize.scss';
import styles from './multiselect-styles.scss';

class Multiselect extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.selectorElement.highlightFirstSelectableOption();
    }
  }

  getSelectorValue() {
    const { values, options, selectedLabel, children } = this.props;
    if (children) {
      return children;
    }
    const { search } = this.state;
    const hasValues = values && values.length;
    if (selectedLabel && !search) {
      return <span>{selectedLabel}</span>;
    }
    if (hasValues && !search) {
      const selectedValuesLabel =
        values.length === options.length || values[0].label === ALL_SELECTED
          ? ALL_SELECTED
          : `${values.length} selected`;
      return <span>{selectedValuesLabel}</span>;
    }
    return null;
  }

  render() {
    const {
      selectedClassName,
      handleChange,
      filterOptions,
      label,
      parentClassName,
      loading,
      children,
      mirrorX,
      hideSelected,
      icon,
      info,
      infoText
    } = this.props;
    return (
      <div className={cx(styles.multiSelectWrapper, parentClassName)}>
        {label && <span className={styles.label}>{label}</span>}
        {info && (
          <div data-tip={infoText} className={styles.infoContainer}>
            <Icon icon={infoIcon} className={styles.infoIcon} />
          </div>
        )}
        <div
          className={cx(
            theme.dropdown,
            styles.multiSelect,
            children ? styles.hasChildren : '',
            { [styles.mirrorX]: mirrorX },
            { [styles.unsearchable]: icon }
          )}
        >
          <div className={cx(styles.values, 'values')}>{this.getSelectorValue()}</div>
          {loading && <Loading className={styles.loader} mini />}
          <MultiSelect
            ref={el => {
              this.selectorElement = el;
            }}
            filterOptions={filterOptions}
            renderValue={() => <span />}
            renderOption={option => {
              const className = option.isSelected ? selectedClassName : '';
              return (
                (!hideSelected || !option.isSelected) && (
                  <div className={cx(className, option.groupId ? styles.nested : '')}>
                    {option.label}
                    {option.isSelected && <span className={styles.checked} />}
                  </div>
                )
              );
            }}
            onValuesChange={handleChange}
            renderToggleButton={({ open }) => (
              <Icon className={open ? styles.isOpen : ''} icon={icon || dropdownArrow} />
            )}
            onSearchChange={s => this.setState({ search: s })}
            search={this.state.search}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

Multiselect.propTypes = {
  parentClassName: PropTypes.string,
  values: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  selectedClassName: PropTypes.string,
  onMultiValueChange: PropTypes.func,
  filterOptions: PropTypes.func,
  handleChange: PropTypes.func,
  info: PropTypes.bool,
  infoText: PropTypes.string,
  label: PropTypes.string,
  selectedLabel: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  hideSelected: PropTypes.bool,
  mirrorX: PropTypes.bool,
  icon: PropTypes.object
};

Multiselect.defaultProps = {
  selectedClassName: styles.selected,
  loading: false
};

export default themr('MultiSelect', styles)(Multiselect);
