import React, { PureComponent } from 'react';
import { PieChart, Tag, Loading, NoContent } from 'cw-components';
import Card from 'components/card';
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
    const emission =
      pieChartData &&
      pieChartData.agricultureEmissions &&
      pieChartData.agricultureEmissions.excludingLUCF;

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
            {emission.formattedPercentage} (
            {renderEmissionValue(emission.formattedValue)})
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
      <PieChart
        data={data}
        width="100%"
        height={250}
        config={config}
        customTooltip={<Tooltip />}
      />
    );
  };

  renderLoading = () => {
    const { pieChartData } = this.props;
    const loading = pieChartData && pieChartData.loading;
    return loading ? (
      <Loading height="100%" />
    ) : (
      <NoContent message="No data available" />
    );
  };

  render() {
    const { pieChartData, ghgEmissionsFilters, isEmbed } = this.props;
    const location = pieChartData && pieChartData.location;
    const year = pieChartData && pieChartData.year;

    const agricultureEmissions =
      pieChartData && pieChartData.agricultureEmissions;
    const totalIncludingLUCF = pieChartData && pieChartData.totalIncludingLUCF;
    const totalExcludingLUCF = pieChartData && pieChartData.totalExcludingLUCF;
    const subtitle = pieChartData
      ? `${location} GHG emissions by sector in ${year} (excluding LUCF)`
      : '';

    const cardTheme = {
      card: isEmbed ? styles.fixedCardEmbed : styles.fixedCard,
      contentContainer: styles.fixedCardContentContainer,
      data: styles.fixedCardData
    };

    return (
      <div>
        <Card theme={cardTheme} subtitle={subtitle}>
          {pieChartData && agricultureEmissions ? (
            <div className={styles.cardContent}>
              <p className={styles.description}>
                <span>{location}</span> in <span>{year}</span>, the Agriculture
                sector contributed{' '}
                {renderEmissionValue(
                  agricultureEmissions.excludingLUCF.formattedValue
                )}{' '}
                GHG emissions, which represented{' '}
                <span>
                  {agricultureEmissions.excludingLUCF.formattedPercentage}
                </span>{' '}
                of its total emissions excluding land-use change and forestry (
                {renderEmissionValue(totalExcludingLUCF)}), and{' '}
                <span>
                  {agricultureEmissions.includingLUCF.formattedPercentage}
                </span>{' '}
                including LUCF ({renderEmissionValue(totalIncludingLUCF)})
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

const EmissionObjectPropType = PropTypes.shape({
  value: PropTypes.number,
  percentageValue: PropTypes.number,
  formattedValue: PropTypes.string,
  formattedPercentage: PropTypes.string
});

CardPieChart.propTypes = {
  pieChartData: PropTypes.shape({
    location: PropTypes.string,
    year: PropTypes.string,
    color: PropTypes.string,
    agricultureEmissions: PropTypes.shape({
      includingLUCF: EmissionObjectPropType,
      excludingLUCF: EmissionObjectPropType
    }),
    totalIncludingLUCF: PropTypes.string,
    totalExcludingLUCF: PropTypes.string,
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
