import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

import styles from './tooltip-chart-styles.scss';

class TooltipChart extends PureComponent {
  getTotal = (keys, data) => {
    if (!keys || !data) return '';
    let total = 0;
    keys.forEach(key => {
      total += data.payload[key.value];
    });
    return `${format('.3s')(total)}t`;
  };

  render() {
    const { config, content, showTotal } = this.props;
    const unit =
      config && config.axes && config.axes.yLeft && config.axes.yLeft.unit;
    return (
      <div className={styles.tooltip}>
        <span className={styles.unit}>{unit}</span>
        {showTotal && (
          <div className={cx(styles.label, styles.labelTotal)}>
            <p>TOTAL</p>
            <p>{this.getTotal(config.columns.y, content.payload[0])}</p>
          </div>
        )}
        {content &&
          content.payload &&
          content.payload.length > 0 &&
          content.payload.map(
            y =>
              (y.payload && y.dataKey !== 'total' ? (
                <div key={`${y.dataKey}`} className={styles.label}>
                  <div className={styles.legend}>
                    <span
                      className={styles.labelDot}
                      style={{
                        backgroundColor:
                          config.theme[y.dataKey] &&
                          config.theme[y.dataKey].stroke
                      }}
                    />
                    <p className={styles.labelName}>
                      {config.theme[y.dataKey] &&
                        config.tooltip[y.dataKey].label}
                    </p>
                  </div>
                  <p className={styles.labelValue}>
                    {y.payload ? `${format('.3s')(y.payload[y.dataKey])}t` : ''}
                  </p>
                </div>
              ) : null)
          )}
      </div>
    );
  }
}

TooltipChart.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object,
  showTotal: Proptypes.bool
};

export default TooltipChart;
