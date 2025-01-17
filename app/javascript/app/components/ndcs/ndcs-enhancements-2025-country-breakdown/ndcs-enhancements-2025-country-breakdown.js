import { createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './ndcs-enhancements-2025-country-breakdown-component';
import { getData } from './ndcs-enhancements-2025-country-breakdown-selectors';

const actions = {};

const mapStateToProps = state => ({
  data: getData(state)
});

function Ndc2025CountryBreakdownContainer(props) {
  return createElement(Component, {
    ...props
  });
}

Ndc2025CountryBreakdownContainer.propTypes = {};

export default withRouter(
  connect(mapStateToProps, actions)(Ndc2025CountryBreakdownContainer)
);
