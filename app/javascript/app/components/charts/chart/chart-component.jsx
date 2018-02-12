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
      error,
      loading,
      dataOptions,
      dataSelected,
      data,
      config,
      height,
      targetParam,
      customMessage
    } = this.props;
    const hasData = data && data.length > 0;
    const getMessage = () => {
      if (error) return 'Something went wrong';
      if (customMessage) return customMessage;
      if (!dataSelected || !dataSelected.length > 0) return 'No data selected';
      return 'No data available';
    };

    const ChartComponent = type === 'line' ? LineChart : ChartStackedArea;
    return (
      <div className={className}>
        {loading && <Loading light className={styles.loader} />}
        {!loading && (error || !hasData) && (
          <NoContent
            message={getMessage()}
            className={styles.noContent}
            minHeight={height}
            icon
          />
        )}
        {!loading && hasData && config && <ChartComponent {...this.props} />}
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
  error: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  data: PropTypes.array,
  config: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetParam: PropTypes.string,
  customMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

Chart.defaultProps = {
  height: 300
};

export default Chart;
