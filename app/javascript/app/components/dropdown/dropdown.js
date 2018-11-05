import { mapProps } from 'recompose';
import sortBy from 'lodash/sortBy';
import Component from './dropdown-component';
import { ALL_SELECTED } from '../../data/constants';

const { NODE_ENV } = process.env;
const optionsSanitizer = mapProps(props => {
  let updatedProps = props;
  if (updatedProps.options && updatedProps.options.length) {
    const updatedOptions = props.options.map(option => {
      let sanitizedOption = option;
      if (!option.label || !option.value) {
        sanitizedOption = { label: '', value: '' };
        if (NODE_ENV === 'development') {
          console.warn(`Option from ${props.label} is empty`);
        }
      }
      return sanitizedOption;
    });
    updatedProps = { ...props, options: updatedOptions };
  }
  return updatedProps;
});

const optionsSort = mapProps(props => {
  let updatedProps = props;
  if (
    !updatedProps.noAutoSort &&
    updatedProps.options &&
    updatedProps.options.length
  ) {
    let options = sortBy(props.options, 'label');
    const allSelectedOption = props.options.find(o => o.label === ALL_SELECTED);
    if (allSelectedOption) {
      const allSelectedIndex = options.indexOf(allSelectedOption);
      options.splice(allSelectedIndex, 1);
      options = [allSelectedOption, ...options];
    }
    updatedProps = { ...props, options };
  }
  return updatedProps;
});

export default optionsSort(optionsSanitizer(Component));
