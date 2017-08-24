import { createElement } from 'react';
import { withRouter } from 'react-router';

import Component from './ndc-component';

const links = [
  {
    label: 'Map',
    path: '/ndcs'
  },
  {
    label: 'Table',
    path: '/ndcs/table'
  }
];

const NDCContainer = props =>
  createElement(Component, {
    ...props,
    links
  });

export default withRouter(NDCContainer);
