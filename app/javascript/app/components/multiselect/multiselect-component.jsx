import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { ReactSelectize, MultiSelect } from 'react-selectize'; // eslint-disable-line
import remove from 'lodash/remove';

import 'react-selectize/themes/index.css';
import styles from './multiselect-styles.scss';

class Multiselect extends Component {
  // eslint-disable-line react/prefer-stateless-function
  filterOptions = options =>
    options.map(o => {
      const isSelected = this.props.values.some(
        filter => o.value === filter.value
      );
      return {
        ...o,
        isSelected
      };
    });

  handleChange = values => {
    const selectedValues = values.map(d => d.value);
    const duplicateValue = this.findDuplicateInArray(selectedValues);
    if (duplicateValue) {
      remove(selectedValues, value => duplicateValue === value);
    }
    const selected = values.filter(
      value => selectedValues.indexOf(value.value) > -1
    );
    this.props.onMultiValueChange(selected);
  };

  findDuplicateInArray = array => {
    let repeatedValue = null;
    array.forEach((value, index) => {
      if (array.indexOf(value) !== index && array.indexOf(value) > -1) {
        repeatedValue = value;
      }
    });
    return repeatedValue;
  };

  render() {
    const { values, selectedClassName } = this.props;
    return (
      <div className={styles.multiSelect}>
        <div className={styles.values}>{values.length} options selected</div>
        <MultiSelect
          filterOptions={this.filterOptions}
          renderValue={value =>
            (values.length > 2 ? <span /> : <span>{value}, </span>)}
          renderOption={option => {
            const className = option.isSelected
              ? selectedClassName
              : styles.normal;
            return (
              <div className={className}>
                {option.label}
                {option.isSelected && <span> selected </span>}
              </div>
            );
          }}
          onValuesChange={this.handleChange}
          {...this.props}
        />
      </div>
    );
  }
}

Multiselect.propTypes = {
  values: Proptypes.array.isRequired,
  selectedClassName: Proptypes.string,
  onMultiValueChange: Proptypes.func
};

Multiselect.defaultProps = {
  selectedClassName: styles.selected
};

export default Multiselect;
