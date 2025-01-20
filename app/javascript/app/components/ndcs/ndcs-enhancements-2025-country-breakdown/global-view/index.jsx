import PropTypes from 'prop-types';

import GlobalViewComponent from './component';

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

export default GlobalViewComponent;
