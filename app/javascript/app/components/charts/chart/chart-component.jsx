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
      hideRemoveOptions
    } = this.props;
    const ChartComponent = type === 'line' ? LineChart : ChartStackedArea;
    const noContent = (
      <NoContent
        message={
          dataSelected && dataSelected.length ? (
            'No data available'
          ) : (
            'No data selected'
          )
        }
        className={styles.noContent}
        minHeight={height}
        icon
      />
    );
    const legendChart = (
      <LegendChart
        className={styles.legend}
        config={config}
        dataOptions={dataOptions}
        dataSelected={dataSelected}
        targetParam={targetParam}
        hideRemoveOptions={hideRemoveOptions}
      />
    );
    return (
      <div className={className}>
        {loading && <Loading light className={styles.loader} />}
        {!loading && (!data || !data.length) && noContent}
        {!loading &&
        data &&
        data.length > 0 &&
        config && <ChartComponent {...this.props} />}
        {!loading && dataOptions && legendChart}
      </div>
    );
  }
}

Chart.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  hideRemoveOptions: PropTypes.bool.isRequired,
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  data: PropTypes.array,
  config: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetParam: PropTypes.string
};

Chart.defaultProps = {
  height: 300,
  hideRemoveOptions: false
};

export default Chart;
