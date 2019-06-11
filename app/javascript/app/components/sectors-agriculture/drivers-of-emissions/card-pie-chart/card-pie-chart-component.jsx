import React, { PureComponent } from 'react';
import { Card, PieChart, Tag, Loading, NoContent } from 'cw-components';
import PropTypes from 'prop-types';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import styles from './card-pie-chart-styles.scss';
import Tooltip from './tooltip/tooltip';

const renderEmissionValue = value => (
  <span
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: value
    }}
  />
);

class CardPieChart extends PureComponent {
  renderAgricultureLabel = () => {
    const { pieChartData } = this.props;
    const color = pieChartData && pieChartData.color;
    const emissionValue = pieChartData && pieChartData.emissionValue;
    const emissionPercentage = pieChartData && pieChartData.emissionPercentage;

    return (
      <div className={styles.agricultureLabel}>
        <div>
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
            {emissionPercentage} ({renderEmissionValue(emissionValue)})
          </span>
        </div>
      </div>
    );
  };

  renderPieChart = () => {
    const { pieChartData } = this.props;
    const data = pieChartData ? pieChartData.data : [];
    const config = pieChartData && pieChartData.config;
    return (
      <PieChart data={data} width="100%" height={250} config={config} customTooltip={<Tooltip />} />
    );
  };

  renderLoading = () => {
    const { pieChartData } = this.props;
    const loading = pieChartData && pieChartData.loading;
    return loading ? <Loading height="100%" /> : <NoContent message="No data available" />;
  };

  render() {
    const { pieChartData, ghgEmissionsFilters, isEmbed } = this.props;
    const location = pieChartData && pieChartData.location;
    const year = pieChartData && pieChartData.year;
    const emissionValue = pieChartData && pieChartData.emissionValue;
    const emissionPercentage = pieChartData && pieChartData.emissionPercentage;

    const cardTheme = {
      card: isEmbed ? styles.fixedCardEmbed : styles.fixedCard,
      contentContainer: styles.fixedCardContentContainer,
      data: styles.fixedCardData
    };

    return (
      <div>
        <Card
          theme={cardTheme}
          subtitle={pieChartData ? `${location} agriculture emissions in ${year}` : ''}
        >
          {pieChartData && emissionValue ? (
            <div className={styles.cardContent}>
              <p className={styles.description}>
                <span>{location}</span> in <span>{year}</span>, the Agriculture sector contributed
                to {renderEmissionValue(emissionValue)} GHG emissions, which represented{' '}
                <span>{emissionPercentage}</span> of all emissions.
              </p>
              <TabletLandscape>
                {this.renderAgricultureLabel()}
                {this.renderPieChart()}
              </TabletLandscape>
              <TabletPortraitOnly>
                <div className={styles.portraitContent}>
                  {this.renderAgricultureLabel()}
                  {this.renderPieChart()}
                </div>
              </TabletPortraitOnly>
            </div>
          ) : (
            this.renderLoading()
          )}
        </Card>
        <EmissionsMetaProvider />
        <EmissionsProvider filters={ghgEmissionsFilters} />
      </div>
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
  }),
  ghgEmissionsFilters: PropTypes.object,
  isEmbed: PropTypes.bool
};

CardPieChart.defaultProps = {
  pieChartData: {},
  ghgEmissionsFilters: {},
  isEmbed: false
};

export default CardPieChart;
