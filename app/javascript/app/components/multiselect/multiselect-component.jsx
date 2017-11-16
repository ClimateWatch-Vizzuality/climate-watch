import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { ReactSelectize, MultiSelect } from 'react-selectize'; // eslint-disable-line
import Icon from 'components/icon';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
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
    const { values, options, selectedLabel } = this.props;
    const { search } = this.state;
    const hasValues = values && values.length;
    if (selectedLabel && !search) {
      return <span>{selectedLabel}</span>;
    }
    if (hasValues && !search) {
      return values.length === options.length ? (
        <span>All selected</span>
      ) : (
        <span>{`${values.length} selected`}</span>
      );
    }
    return null;
  }

  render() {
    const {
      selectedClassName,
      handleChange,
      filterOptions,
      label,
      parentClassName
    } = this.props;
    return (
      <div className={cx(styles.multiSelectWrapper, parentClassName)}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={cx(theme.dropdown, styles.multiSelect)}>
          <div className={cx(styles.values, 'values')}>
            {this.getSelectorValue()}
          </div>
          <MultiSelect
            ref={el => {
              this.selectorElement = el;
            }}
            filterOptions={filterOptions}
            renderValue={() => <span />}
            renderOption={option => {
              const className = option.isSelected ? selectedClassName : '';
              return (
                <div
                  className={cx(className, option.groupId ? styles.nested : '')}
                >
                  {option.label}
                  {option.isSelected && <span className={styles.checked} />}
                </div>
              );
            }}
            onValuesChange={handleChange}
            renderToggleButton={({ open }) => (
              <Icon
                className={open ? styles.isOpen : ''}
                icon={dropdownArrow}
              />
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
  parentClassName: Proptypes.string,
  values: Proptypes.array.isRequired,
  options: Proptypes.array.isRequired,
  selectedClassName: Proptypes.string,
  onMultiValueChange: Proptypes.func,
  filterOptions: Proptypes.func,
  handleChange: Proptypes.func,
  label: Proptypes.string,
  selectedLabel: Proptypes.string
};

Multiselect.defaultProps = {
  selectedClassName: styles.selected
};

export default themr('MultiSelect', styles)(Multiselect);
