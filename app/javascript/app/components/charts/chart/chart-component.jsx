import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ChartStackedArea from 'components/charts/stacked-area';
import LineChart from 'components/charts/line';
import LegendChart from 'components/charts/legend-chart';
import Loading from 'components/loading';
import NoContent from 'components/no-content';

import styles from './chart-styles.scss';

class Chart extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      className,
      type,
      loading,
      dataOptions,
      dataSelected,
      data,
      config,
      height,
      targetParam,
      customMessage
    } = this.props;
    const ChartComponent = type === 'line' ? LineChart : ChartStackedArea;
    let message = 'No data available';
    const noData = !data || !data.length;
    if (customMessage) message = customMessage;
    else if (!dataSelected || !dataSelected.length) { message = 'No data selected'; }
    return (
      <div className={className}>
        {loading && <Loading light className={styles.loader} />}
        {!loading && noData && (
          <NoContent
            message={message}
            className={styles.noContent}
            minHeight={height}
            icon
          />
        )}
        {!loading &&
        noData &&
        config && <ChartComponent {...this.props} />}
        {!loading && dataOptions && (
          <LegendChart
            className={styles.legend}
            config={config}
            dataOptions={dataOptions}
            dataSelected={dataSelected}
            targetParam={targetParam}
          />
        )}
      </div>
    );
  }
}

Chart.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  data: PropTypes.array,
  config: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetParam: PropTypes.string,
  customMessage: PropTypes.string
};

Chart.defaultProps = {
  height: 300
};

export default Chart;
