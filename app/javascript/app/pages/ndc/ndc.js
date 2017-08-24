import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import paths from 'app/data/world-50m-paths';
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

const NDCContainer = (props) => {
  const handleCountryClick = (geography) => {
    props.history.push(`ndcs/${geography.id}`);
  };

  return createElement(Component, {
    ...props,
    paths,
    links,
    handleCountryClick
  });
};

export default withRouter(connect(null)(NDCContainer));
