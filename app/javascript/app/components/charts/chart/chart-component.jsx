import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ChartStackedArea from 'components/charts/stacked-area';
import LineChart from 'components/charts/line';
import LegendChart from 'components/charts/legend-chart';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import isEmpty from 'lodash/isEmpty';
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
      customMessage,
      model,
      hideRemoveOptions,
      dataZoomComponent
    } = this.props;
    const hasData = data && data.length > 0;
    const getMessage = () => {
      if (error) return 'Something went wrong';
      if (customMessage) return customMessage;
      if (!dataSelected || !dataSelected.length > 0) return 'No data selected';
      return 'No data available';
    };
    const ChartComponent = type === 'line' ? LineChart : ChartStackedArea;
    const hasError = !loading && (error || !hasData || !config);
    const hasDataOptions = !loading && dataOptions;
    return (
      <div className={className}>
        {loading && <Loading light className={styles.loader} />}
        {hasError && (
          <NoContent
            message={getMessage()}
            className={styles.noContent}
            minHeight={height}
          />
        )}
        {!loading && hasData && config && !isEmpty(config) && (
          <ChartComponent {...this.props} />
        )}
        {dataZoomComponent}
        {hasDataOptions && (
          <LegendChart
            className={styles.legend}
            config={config}
            dataOptions={dataOptions}
            dataSelected={dataSelected}
            targetParam={targetParam}
            model={model}
            hideRemoveOptions={hideRemoveOptions}
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
  hideRemoveOptions: PropTypes.bool.isRequired,
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  data: PropTypes.array,
  config: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  model: PropTypes.object,
  targetParam: PropTypes.string,
  dataZoomComponent: PropTypes.node
};

Chart.defaultProps = {
  height: 300,
  hideRemoveOptions: false,
  dataZoomComponent: null
};

export default Chart;
