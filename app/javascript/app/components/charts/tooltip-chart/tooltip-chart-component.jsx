import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

import styles from './tooltip-chart-styles.scss';

class TooltipChart extends PureComponent {
  getTotal = (keys, data) => {
    let total = 0;
    keys.forEach(key => {
      total += data.payload[key];
    });
    return format('.3s')(total);
  };

  render() {
    const { config, content } = this.props;
    return (
      <div className={styles.tooltip}>
        <span className={styles.unit}>{config.axes.yLeft.unit}</span>
        {content.payload.length > 0 && (
          <div className={cx(styles.label, styles.labelTotal)}>
            <p>TOTAL</p>
            <p>{this.getTotal(config.columns.y, content.payload[0])}</p>
          </div>
        )}
        {content.payload.length > 0 &&
          content.payload.map(y => (
            <div key={y.dataKey} className={styles.label}>
              <div className={styles.legend}>
                <span
                  className={styles.labelDot}
                  style={{ backgroundColor: config.theme[y.dataKey].fill }}
                />
                <p className={styles.labelName}>
                  {config.tooltip[y.dataKey].label}
                </p>
              </div>
              <p className={styles.labelValue}>
                {y.payload ? format('.3s')(y.payload[y.dataKey]) : ''}
              </p>
            </div>
          ))}
      </div>
    );
  }
}

TooltipChart.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object
};

export default TooltipChart;
