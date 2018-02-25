import { mapProps } from 'recompose';
import sortBy from 'lodash/sortBy';
import Component from './dropdown-component';

const optionsSanitizer = mapProps(props => {
  let updatedProps = props;
  if (updatedProps.options && updatedProps.options.length) {
    const updatedOptions = props.options.map(option => {
      let sanitizedOption = option;
      if (!option.label || !option.value) {
        sanitizedOption = { label: '', value: '' };
        console.warn(`Option from ${props.label} is empty`);
      }
      return sanitizedOption;
    });
    updatedProps = { ...props, options: updatedOptions };
  }
  return updatedProps;
});

const optionsSort = mapProps(props => {
  let updatedProps = props;
  if (updatedProps.options && updatedProps.options.length) {
    updatedProps = { ...props, options: sortBy(props.options, 'label') };
  }
  return updatedProps;
});

export default optionsSort(optionsSanitizer(Component));
