import React from 'react';
import PropTypes from 'prop-types';
import MeatConsumptionProvider from 'providers/agriculture-meat-consumption-provider';
import MeatWorldConsumptionProvider from 'providers/agriculture-world-meat-consumption-provider';
import MeatProductionProvider from 'providers/agriculture-meat-production-provider';
import MeatWorldProductionProvider from 'providers/agriculture-world-meat-production-provider';
import MeatTradeProvider from 'providers/agriculture-meat-trade-provider';
import MeatWorldTradeProvider from 'providers/agriculture-world-meat-trade-provider';
import { Card, Icon, Chart, Dropdown } from 'cw-components';
import NoContent from 'components/no-content';
import infoIcon from 'assets/icons/info';
import Tooltip from './tooltip';

import styles from './meat-data-styles.scss';

const cardTheme = {
  card: styles.card,
  data: styles.data,
  contentContainer: styles.contentContainer
};

const MeatData = ({
  selectedCountry,
  selectedYear,
  categories,
  breakByOptions,
  selectedCategory,
  selectedBreakBy,
  chartData,
  chartConfig,
  dataSelected,
  dataOptions,
  domain,
  updateCategoryFilter,
  updateBreakByFilter,
  handleLegendChange,
  handleInfoBtnClick
}) => (
  <div className={styles.container}>
    {chartData && (
      <Card
        key={'Production, Consumption and Trade'}
        title={'Production, Consumption and Trade'}
        theme={cardTheme}
      >
        <div className={styles.cardContainer}>
          <div className={styles.header}>
            <div className={styles.title}>
              Many crops grown within a country are traded globally and consumed
              elsewhere. Explore countries’ production, consumption and trade of
              some of the main agricultural products.
            </div>
            <Icon
              icon={infoIcon}
              theme={{ icon: styles.cardInfoIcon }}
              onClick={handleInfoBtnClick}
            />
          </div>
          <div className={styles.actionsContainer}>
            {categories && (
              <Dropdown
                label={'Categories'}
                theme={{ select: styles.dropdown }}
                value={selectedCategory}
                options={categories}
                onValueChange={updateCategoryFilter}
                hideResetButton
              />
            )}
            {breakByOptions && (
              <Dropdown
                label={'Break by'}
                theme={{ select: styles.dropdown }}
                value={selectedBreakBy}
                options={breakByOptions}
                onValueChange={updateBreakByFilter}
                hideResetButton
              />
            )}
          </div>
          <div className={styles.chartContainer}>
            {chartData && chartData.hasValues ? (
              <Chart
                type="bar"
                theme={{ legend: styles.legend }}
                config={chartConfig}
                data={chartData.data}
                domain={domain}
                customTooltip={<Tooltip />}
                dataSelected={dataSelected}
                dataOptions={dataOptions}
                height={300}
                onLegendChange={handleLegendChange}
                barSize={40}
                barGap={0}
              />
            ) : (
              <NoContent
                message="No data for selected filters"
                className={styles.noContent}
                minHeight={300}
              />
            )}
          </div>
        </div>
        <div className={styles.yearData}>
          <span>{selectedYear && selectedYear.value}</span> data
        </div>
      </Card>
    )}
    {selectedCountry &&
    selectedYear && [
        <MeatConsumptionProvider
          params={{ country: selectedCountry.value, year: selectedYear.value }}
        />,
        <MeatProductionProvider
          params={{ country: selectedCountry.value, year: selectedYear.value }}
        />,
        <MeatTradeProvider
          params={{ country: selectedCountry.value, year: selectedYear.value }}
        />
      ]}
    {selectedYear && [
      <MeatWorldConsumptionProvider params={{ year: selectedYear.value }} />,
      <MeatWorldProductionProvider params={{ year: selectedYear.value }} />,
      <MeatWorldTradeProvider params={{ year: selectedYear.value }} />
    ]}
  </div>
);

MeatData.propTypes = {
  selectedCountry: PropTypes.object,
  selectedYear: PropTypes.object,
  chartData: PropTypes.shape({
    data: PropTypes.array,
    hasValues: PropTypes.bool
  }),
  chartConfig: PropTypes.object,
  categories: PropTypes.array,
  breakByOptions: PropTypes.array,
  selectedCategory: PropTypes.object,
  selectedBreakBy: PropTypes.object,
  handleInfoBtnClick: PropTypes.func,
  dataSelected: PropTypes.array,
  dataOptions: PropTypes.array,
  domain: PropTypes.object,
  updateCategoryFilter: PropTypes.func,
  updateBreakByFilter: PropTypes.func,
  handleLegendChange: PropTypes.func
};

export default MeatData;
