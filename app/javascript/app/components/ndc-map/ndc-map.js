import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import paths from 'app/data/world-50m-paths';
import Component from './ndc-map-component';

const NDCContainer = (props) => {
  const handleCountryClick = (geography) => {
    props.history.push(`ndcs/country/${geography.id}`);
  };

  return createElement(Component, {
    ...props,
    paths,
    handleCountryClick
  });
};

export default withRouter(connect(null)(NDCContainer));
