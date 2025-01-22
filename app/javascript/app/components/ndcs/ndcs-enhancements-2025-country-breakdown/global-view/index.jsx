import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getData } from './selectors';
import GlobalViewComponent from './component';

const mapStateToProps = state => ({
  data: getData(state)
});

const actions = {};

export const chartConfigPropTypes = {
  chartId: PropTypes.string.isRequired,
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

export default withRouter(
  connect(mapStateToProps, actions)(GlobalViewComponent)
);
