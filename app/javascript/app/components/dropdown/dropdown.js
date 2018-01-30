import { mapProps } from 'recompose';
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

export default optionsSanitizer(Component);
