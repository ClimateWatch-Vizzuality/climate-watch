import { createElement } from 'react';
import { connect } from 'react-redux';

import DataComponent from './data-component';
import actions from './data-actions';

export { default as component } from './data-component';
export { default as reducers } from './data-reducers';
export { default as actions } from './data-actions';

const DataContainer = (props) => {
  console.info(props);

  return createElement(DataComponent, {
    ...props
  });
};

export default connect(null, actions)(DataContainer);
