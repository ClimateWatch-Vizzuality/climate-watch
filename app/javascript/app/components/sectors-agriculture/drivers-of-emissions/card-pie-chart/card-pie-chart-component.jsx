import React, { PureComponent } from 'react';
import { Card, PieChart, Tag, Loading, NoContent } from 'cw-components';
import PropTypes from 'prop-types';
import * as styles from './card-pie-chart-styles.scss';
import Tooltip from './tooltip/tooltip';

class CardPieChart extends PureComponent {
  renderLoading = loading =>
    loading ? (
      <Loading height="100%" />
    ) : (
      <NoContent message="No data available" />
    );

  render() {
    const { pieChartData } = this.props;

    const data = pieChartData ? pieChartData.data : [];
    const config = pieChartData && pieChartData.config;
    const loading = pieChartData && pieChartData.loading;
    const location = pieChartData && pieChartData.location;
    const year = pieChartData && pieChartData.year;
    const emissionValue = pieChartData && pieChartData.emissionValue;
    const emissionPercentage = pieChartData && pieChartData.emissionPercentage;
    const color = pieChartData && pieChartData.color;

    const theme = {
      card: styles.fixedCard,
      contentContainer: styles.fixedCardContentContainer,
      data: styles.fixedCardData
    };

    return (
      <Card
        theme={theme}
        subtitle={
          pieChartData ? `${location} agriculture emissions in ${year}` : ''
        }
      >
        {pieChartData && emissionValue ? (
          <div className={styles.cardContent}>
            <p className={styles.description}>
              <span>{location}</span> in <span>{year}</span>, the Agriculture
              sector contributed to{' '}
              <span>
                {emissionValue} MtCO<sub>2</sub>e
              </span>{' '}
              GHG emissions, which represented <span>{emissionPercentage}</span>{' '}
              of all emissions.
            </p>
            <div className={styles.labels}>
              <Tag
                key="agr"
                label="Agriculture"
                theme={{
                  tag: styles.tagTheme
                }}
                canRemove={false}
                color={color}
              />
              <span className={styles.labelValue} style={{ color }}>
                {`${emissionPercentage} (${emissionValue} `}
                <span>
                  MtCO<sub>2</sub>
                </span>)
              </span>
            </div>
            <PieChart
              data={data}
              width={285}
              height={200}
              config={config}
              customTooltip={<Tooltip />}
            />
          </div>
        ) : (
          this.renderLoading(loading)
        )}
      </Card>
    );
  }
}

CardPieChart.propTypes = {
  pieChartData: PropTypes.shape({
    location: PropTypes.string,
    year: PropTypes.string,
    formattedValue: PropTypes.string,
    formattedPercentage: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        percentageValue: PropTypes.number
      })
    ),
    config: PropTypes.object
  }).isRequired
};

export default CardPieChart;
