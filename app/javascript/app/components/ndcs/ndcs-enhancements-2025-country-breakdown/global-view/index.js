import { createElement } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getData } from './selectors';
import Component from './component';

const mapStateToProps = state => ({
  data: getData(state)
});

function GlobalViewContainer(props) {
  return createElement(Component, { ...props });
}

const actions = {};

export const chartConfigPropTypes = {
  chartId: PropTypes.string.isRequired,
  options: {
    conditionalNdc: PropTypes.bool.isRequired
  },
  data: PropTypes.object.isRequired,
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  }),
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

GlobalViewContainer.propTypes = {};

export default withRouter(
  connect(mapStateToProps, actions)(Component)
);
