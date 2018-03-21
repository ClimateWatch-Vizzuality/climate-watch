import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

import styles from 'styles/themes/chart-tooltip/chart-tooltip.scss';

class TooltipChart extends PureComponent {
  getFormat() {
    return this.props.forceTwoDecimals ? '.2f' : '.2s';
  }

  getTotal = (keys, data, unitIsCo2) => {
    if (!keys || !data) return '';
    let total = 0;
    keys.forEach(key => {
      if (data.payload[key.value]) total += data.payload[key.value];
    });
    return `${format(this.getFormat())(total)}${unitIsCo2 ? 't' : ''}`;
  };

  sortByValue = payload => {
    const yValues = payload[0].payload;
    const compare = (a, b) => yValues[b.dataKey] - yValues[a.dataKey];
    return payload.sort(compare);
  };

  render() {
    const { config, content, showTotal } = this.props;

    const unit =
      config && config.axes && config.axes.yLeft && config.axes.yLeft.unit;
    const unitIsCo2 = unit === 'CO<sub>2</sub>e';
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          <span className={cx(styles.labelName, styles.labelNameBold)}>
            {content.label}
          </span>
          <span
            className={styles.unit}
            dangerouslySetInnerHTML={{ __html: unit }} // eslint-disable-line
          />
        </div>
        {showTotal && (
          <div className={cx(styles.label, styles.labelTotal)}>
            <p>TOTAL</p>
            <p>
              {this.getTotal(config.columns.y, content.payload[0], unitIsCo2)}
            </p>
          </div>
        )}
        {content &&
          content.payload &&
          content.payload.length > 0 &&
          this.sortByValue(content.payload, config).map(
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
                    {y.payload ? (
                      `${format(this.getFormat())(
                        y.payload[y.dataKey]
                      )}${unitIsCo2 ? 't' : ''}`
                    ) : (
                      ''
                    )}
                  </p>
                </div>
              ) : null)
          )}
        {content && !content.payload && <div>No data fool</div>}
      </div>
    );
  }
}

TooltipChart.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object,
  showTotal: Proptypes.bool,
  forceTwoDecimals: Proptypes.bool
};

export default TooltipChart;
