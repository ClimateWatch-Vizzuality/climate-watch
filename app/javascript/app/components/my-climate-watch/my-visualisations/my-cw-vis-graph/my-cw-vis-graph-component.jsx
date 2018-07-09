import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Legend from 'components/my-climate-watch/viz-creator/components/charts/legend';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import {
  chartDataSelector,
  getVisualisationType
} from 'components/my-climate-watch/viz-creator/viz-creator-selectors';

import styles from './my-cw-vis-graph-styles.scss';

class MyVisGraph extends PureComponent {
  render() {
    const { data } = this.props;
    const datasets = data.json_body;
    const chart = datasets ? getVisualisationType({ datasets }) : null;
    const chartData = datasets ? chartDataSelector({ datasets }) : null;
    return (
      <div className={cx(styles.visContainer)}>
        <h3 className={styles.visTitle}>{data.title}</h3>
        {datasets && [
          <RenderChart
            className={styles.vizChartContainer}
            chart={chart}
            config={chartData}
            height={360}
          />,
          <Legend key="legend" theme={styles} data={chartData.legend} />
        ]}
        <div className={styles.visDescription}>{data.description}</div>
      </div>
    );
  }
}

MyVisGraph.propTypes = {
  data: PropTypes.object
};

export default MyVisGraph;
