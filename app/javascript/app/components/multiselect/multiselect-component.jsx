import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { ReactSelectize, MultiSelect } from 'react-selectize'; // eslint-disable-line
import Icon from 'components/icon';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import 'react-selectize/themes/index.css';
import styles from './multiselect-styles.scss';

class Multiselect extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      values,
      selectedClassName,
      placeholderText,
      handleChange,
      filterOptions
    } = this.props;
    return (
      <div className={styles.multiSelect}>
        <div className={styles.values}>
          {placeholderText && !values.length ? (
            placeholderText
          ) : (
            `${values.length} selected`
          )}
        </div>
        <MultiSelect
          filterOptions={filterOptions}
          renderValue={value =>
            (values.length > 2 ? <span /> : <span>{value}, </span>)}
          renderOption={option => {
            const className = option.isSelected ? selectedClassName : '';
            return (
              <div className={className}>
                {option.label}
                {option.isSelected && <span className={styles.checked} />}
              </div>
            );
          }}
          onValuesChange={handleChange}
          renderToggleButton={({ open }) => (
            <Icon className={open ? styles.isOpen : ''} icon={dropdownArrow} />
          )}
          {...this.props}
        />
      </div>
    );
  }
}

Multiselect.propTypes = {
  values: Proptypes.array.isRequired,
  selectedClassName: Proptypes.string,
  onMultiValueChange: Proptypes.func,
  placeholderText: Proptypes.string,
  filterOptions: Proptypes.func,
  handleChange: Proptypes.func
};

Multiselect.defaultProps = {
  selectedClassName: styles.selected
};

export default Multiselect;
