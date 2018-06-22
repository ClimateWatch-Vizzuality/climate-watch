import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import charts from '../charts';
import styles from './render-chart-styles';

class RenderChart extends PureComponent {
  render() {
    const { chart, className, ...props } = this.props;
    return (
      <div className={cx(className, styles.container)}>
        {createElement(charts[chart], props)}
      </div>
    );
  }
}

RenderChart.propTypes = {
  chart: PropTypes.string,
  className: PropTypes.string
};

export default RenderChart;
