import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { deburrUpper } from 'utils/utils';
import remove from 'lodash/remove';

import MultiSelectComponent from './multiselect-component';

export { default as component } from './multiselect-component';
export { default as styles } from './multiselect-styles';

class MultiSelectContainer extends PureComponent {
  filterOptions = (options, something, search) => {
    const optionsParsed = options.map(o => {
      const isSelected = this.props.values.some(
        filter => o.value === filter.value
      );
      return {
        ...o,
        isSelected
      };
    });
    return search
      ? optionsParsed.filter(
        d => deburrUpper(d.label).indexOf(deburrUpper(search)) > -1
      )
      : optionsParsed;
  };

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
    return createElement(MultiSelectComponent, {
      ...this.props,
      filterOptions: this.filterOptions,
      handleChange: this.handleChange,
      findDuplicateInArray: this.findDuplicateInArray
    });
  }
}

MultiSelectContainer.propTypes = {
  onMultiValueChange: Proptypes.func,
  values: Proptypes.array
};

export default MultiSelectContainer;
