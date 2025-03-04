import { createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { actions as modalActions } from 'components/modal-metadata';

import { getData } from './selectors';
import Component from './component';

const mapStateToProps = state => ({
  data: getData(state)
});

const actions = { ...modalActions };

function CountryBreakdownContainer(props) {
  const { setModalMetadata } = props;

  const handleInfoClick = () => {
    setModalMetadata({
      category: 'NDC Content Map',
      slugs: '2025_NDC',
      open: true
    });
  };

  return createElement(Component, {
    ...props,
    handleInfoClick
  });
}

export default withRouter(
  connect(mapStateToProps, actions)(CountryBreakdownContainer)
);
