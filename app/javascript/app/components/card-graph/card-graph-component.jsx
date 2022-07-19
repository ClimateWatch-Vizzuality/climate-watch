/* eslint-disable no-confusing-arrow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { PieChart, Chart } from 'cw-components';
import range from 'lodash/range';
import camelCase from 'lodash/camelCase';
import { format } from 'd3-format';

import styles from './card-graph-styles.scss';

class CardGraph extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      noData: false
    };
  }

  handleInfoClick = slug => {
    const { setModalMetadata } = this.props;
    setModalMetadata({
      category: 'Country',
      slugs: [slug],
      open: true
    });
  };

  renderRank() {
    const { sectionData, maximumCountries, iso } = this.props;
    if (!sectionData || !sectionData.data) return null;

    const [data, dataRank] = sectionData.data;
    if (!data || !data.values || !dataRank || !dataRank.values) {
      this.setState({ noData: true });
      return null;
    }
    const values = data.values.find(v => v.location === iso);
    const rankValues = dataRank.values.find(v => v.location === iso);

    if (!values || !rankValues) {
      this.setState({ noData: true });
      return null;
    }
    const { value } = values;
    const { value: rank } = rankValues;
    const percentage = (rank * 100) / maximumCountries;
    return (
      <div className={styles.lineChartContainer}>
        <div className={styles.rankValue}>{format(',.2f')(value)}</div>
        <div className={styles.rankMeter}>
          <div className={styles.rankAbsoluteValue}>
            <span className={styles.countriesNumber}>Rank </span>
            {rank}
            <span className={styles.countriesNumber}>
              {' '}
              of {maximumCountries} countries
            </span>
          </div>
          <span className={styles.rankMarkContainer}>
            <span
              className={styles.rankMark}
              style={{ left: `${percentage}%` }}
            />
          </span>
          {range(10).map((_, i) => (
            <div
              key={i} // eslint-disable-line react/no-array-index-key
              className={cx(styles.rankTick, styles[`meter-${i + 1}`])}
            />
          ))}
        </div>
      </div>
    );
  }

  renderPieChart() {
    const { sectionData } = this.props;
    if (!sectionData || !sectionData.data) {
      this.setState({ noData: true });
      return null;
    }
    const CustomInnerHoverLabel = ({
      x,
      y,
      value,
      props: {
        payload: { name }
      }
    }) => (
      <text x={x} y={y - 35}>
        <tspan x={x} textAnchor="middle">
          {Math.round(value * 10000) / 100} %
        </tspan>
        <tspan x={x} textAnchor="middle" dy="20">
          Average Annual
        </tspan>
        <tspan x={x} textAnchor="middle" dy="20">
          Hazard Ocurrence
        </tspan>
        <tspan x={x} textAnchor="middle" dy="20">
          of
        </tspan>
        <tspan x={x} textAnchor="middle" dy="20">
          {name}
        </tspan>
      </text>
    );
    const { data, config } = sectionData.data;

    if (!data) return null;

    return (
      <div className={styles.pieChart}>
        <PieChart
          data={data}
          width={350}
          config={config}
          customTooltip={<div style={{ display: 'none' }} />}
          customInnerHoverLabel={CustomInnerHoverLabel}
          theme={{ pieChart: styles.pieChart }}
        />
        <div className={styles.pieLegend}>
          {data.map(d => {
            const theme = config.theme[camelCase(d.name)];
            return (
              <div className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: theme.stroke }}
                />
                <span className={styles.percentage}>{d.value} %</span>
                <span className={styles.label}>{theme.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderLineChart() {
    const { sectionData, maximumCountries, iso } = this.props;
    if (!sectionData) return null;
    const [chartData, chartDataRank] = sectionData;
    const { data, config, domain } = chartData;
    const values = chartDataRank.values.find(v => v.location === iso);
    if (!values) {
      this.setState({ noData: true });
      return null;
    }
    const { value: rank } = values;
    const percentage = (rank * 100) / maximumCountries;
    return (
      <div className={styles.lineChartContainer}>
        <div className={styles.lineChart}>
          <Chart
            type="line"
            config={config}
            data={data}
            dots={false}
            height={450}
            domain={domain}
            showUnit
          />
        </div>
        <div className={styles.rankMeter}>
          <div className={styles.rankAbsoluteValue}>
            <span className={styles.countriesNumber}>Rank </span>
            {rank}
            <span className={styles.countriesNumber}>
              {' '}
              of {maximumCountries} countries
            </span>
          </div>
          <span className={styles.rankMarkContainer}>
            <span
              className={styles.rankMark}
              style={{ left: `${percentage}%` }}
            />
          </span>
          {range(10).map((_, i) => (
            <div
              key={i} // eslint-disable-line react/no-array-index-key
              className={cx(styles.rankTick, styles[`meter-${i + 1}`])}
            />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { type } = this.props;
    const { noData } = this.state;

    // if (noData) {
    //   return (
    //     <div className={styles.noDataContainer}>
    //       <span>No data available.</span>
    //     </div>
    //   );
    // }

    if (type === 'RANK') return this.renderRank();
    if (type === 'LINE_CHART') return this.renderLineChart();
    if (type === 'PIE_CHART') return this.renderPieChart();

    // switch (type) {
    //   case 'RANK':
    //     return this.renderRank();
    //   case 'LINE_CHART':
    //     return this.renderLineChart();
    //   case 'PIE_CHART':
    //     return this.renderPieChart();
    //   default:
    //     return null;
    // }

    if (noData) {
      return (
        <div className={styles.noDataContainer}>
          <span>No data available.</span>
        </div>
      );
    }

    return null;
  }
}

CardGraph.propTypes = {
  sectionData: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  type: PropTypes.string,
  maximumCountries: PropTypes.number,
  iso: PropTypes.string.isRequired
};

export default CardGraph;
