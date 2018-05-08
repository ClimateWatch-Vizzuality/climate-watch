import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import charts from '../charts';
import styles from './render-chart-styles';

class RenderChart extends PureComponent {
  render() {
    const { chart, ...props } = this.props;
    return (
      <div className={styles.container}>
        {createElement(charts[chart], props)}
      </div>
    );
  }
}

RenderChart.propTypes = {
  chart: PropTypes.string
};

export default RenderChart;
