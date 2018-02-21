import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import charts from '../charts';

class RenderChart extends PureComponent {
  render() {
    const { chart, ...props } = this.props;
    return createElement(charts[chart], props);
  }
}

RenderChart.propTypes = {
  chart: PropTypes.object
};

export default RenderChart;
