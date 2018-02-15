import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
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
      targetParam
    } = this.props;
    const ChartComponent = type === 'line' ? LineChart : ChartStackedArea;
    return (
      <div className={className}>
        {loading && <Loading light className={styles.loader} />}
        {!loading &&
        !isEmpty(data) && (
          /* eslint-disable */
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
          /* eslint-enable */
          )}
        {!loading &&
        data &&
        data.length > 0 &&
        config && <ChartComponent {...this.props} />}
        {!loading &&
        dataOptions && (
          /* eslint-disable */
          <LegendChart
            className={styles.legend}
            config={config}
            dataOptions={dataOptions}
            dataSelected={dataSelected}
            targetParam={targetParam}
          />
          /* eslint-enable */
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
  targetParam: PropTypes.string
};

Chart.defaultProps = {
  height: 300
};

export default Chart;
