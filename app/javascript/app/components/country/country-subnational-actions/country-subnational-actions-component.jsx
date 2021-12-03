/* eslint-disable no-confusing-arrow, no-nested-ternary */

import React from 'react';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';

import Card from 'components/card';
import Chart from 'components/charts/chart';
import Loading from 'components/loading';

import CountryProfileIndicatorsProvider from 'providers/country-profile-indicators-provider';

import { CHART_COLORS } from 'data/constants';

import styles from './country-subnational-actions-styles.scss';

function mergeForChart({ data, mergeBy, labelKey, valueKey }) {
  if (!data || !data.length) return [];
  const dataObj = {};
  data.forEach(rd => {
    dataObj[rd[mergeBy]] = {
      x: rd[mergeBy],
      ...dataObj[rd[mergeBy]],
      [rd[labelKey]]: rd[valueKey]
    };
  });
  return sortBy(Object.values(dataObj), mergeBy);
}

function getChartConfig(categories) {
  const getTheme = values =>
    values.reduce(
      (acc, value, i) => ({
        ...acc,
        [value]: { stroke: CHART_COLORS[i], fill: CHART_COLORS[i] }
      }),
      {}
    );
  const getTooltipConfig = values =>
    values.reduce((acc, value) => ({ ...acc, [value]: { label: value } }), {});

  return {
    axes: {
      xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
      yLeft: { format: 'number' }
    },
    animation: false,
    columns: {
      x: [{ label: 'Year', value: 'x' }],
      y: categories.map(b => ({ label: b, value: b }))
    },
    tooltip: getTooltipConfig(categories),
    theme: getTheme(categories)
  };
}

function Indicator({ name, value }) {
  return (
    <div className={styles.actionIndicator}>
      <div className={styles.actionIndicatorValue}>{value}</div>
      <div className={styles.actionIndicatorLabel}>{name}</div>
    </div>
  );
}

Indicator.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string
};

function SourceLink({ title, link }) {
  return (
    <a
      className={styles.sourceLink}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  );
}

SourceLink.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
};

const BADGES = ['Joined', 'Plan', 'Target'];

function SubnationalActions({ iso, indicators, loading }) {
  const showByMillion = value => Number((value || 0) / 1000000).toFixed(2);
  const citiesBadgeValues = (
    indicators.city_badge_type?.values || []
  ).map(x => ({ ...x, value: parseInt(x.value, 10) }));
  const companyTargetQualValues = (
    indicators.company_target_qualification?.values || []
  ).map(x => ({ ...x, value: parseInt(x.value, 10) }));
  const targets = uniq(companyTargetQualValues.map(x => x.category));
  const citiesChartData = mergeForChart({
    data: citiesBadgeValues,
    mergeBy: 'year',
    labelKey: 'category',
    valueKey: 'value'
  });
  const companiesChartData = mergeForChart({
    data: companyTargetQualValues,
    mergeBy: 'year',
    labelKey: 'category',
    valueKey: 'value'
  });
  const latestYear = Math.max(
    ...uniq(companyTargetQualValues.map(x => x.year))
  );
  const latestCompaniesTargetQualification = companiesChartData.find(
    x => x.x === latestYear
  );

  const citiesChartConfig = getChartConfig(BADGES);
  const companiesChartConfig = getChartConfig(targets);

  const cardTheme = {
    title: styles.cardTitle,
    data: styles.cardData
  };
  const tagTheme = {
    tag: styles.tag,
    label: styles.tagLabel
  };

  const noPadding = { left: 0, right: 0, top: 0, bottom: 0 };

  const citiesNoData =
    !loading &&
    indicators.city_badge_type &&
    isEmpty(indicators.city_badge_type.values);
  const companiesNoData =
    !loading &&
    indicators.company_target_qualification &&
    isEmpty(indicators.company_target_qualification.values);

  const renderNoData = () => (
    <div className={styles.noData}>No data available.</div>
  );

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <CountryProfileIndicatorsProvider
          indicatorSlugs={[
            'city_badge_type',
            'city_commited',
            'city_ppl',
            'company_commited',
            'company_target',
            'company_target_qualification'
          ]}
          locations={[iso]}
        />

        <div className={styles.container}>
          <h3 className={styles.title}>Subnational Actions</h3>

          <div className={styles.cardsContainer}>
            <Card
              title={
                <div className={styles.cardHeader}>
                  <div>Cities</div>

                  <SourceLink title="Explore more on GCOM" link="#" />
                </div>
              }
              theme={cardTheme}
              contentFirst
            >
              {loading ? (
                <Loading light className={styles.loading} />
              ) : citiesNoData ? (
                renderNoData()
              ) : (
                <React.Fragment>
                  <div className={styles.statContainer}>
                    <Indicator {...indicators.city_commited} />
                    <div className={styles.representing}>Representing</div>
                    <Indicator
                      value={showByMillion(indicators.city_ppl?.value)}
                      name={indicators.city_ppl?.name}
                    />
                  </div>

                  <Chart
                    type="area"
                    config={citiesChartConfig}
                    data={citiesChartData}
                    height={200}
                    padding={noPadding}
                    loading={!citiesChartData}
                    includeTotalLine={false}
                    highlightLastPoint={false}
                    unit={false}
                    ghgChart={false}
                    formatValue={v => v}
                  />

                  <h3 className={styles.chartTitle}>
                    {indicators.city_badge_type?.name}
                  </h3>

                  <div className={styles.stagesContainer}>
                    <p>Stages:</p>

                    <div className={styles.stages}>
                      {BADGES.map(badge => (
                        <Tag
                          color={citiesChartConfig.theme[badge].fill}
                          theme={tagTheme}
                          label={badge}
                        />
                      ))}
                    </div>
                    {/* <Tag
                        color="#cccdcf"
                        theme={tagTheme}
                        label="Total Population"
                        /> */}
                  </div>
                </React.Fragment>
              )}
            </Card>
            <Card
              title={
                <div className={styles.cardHeader}>
                  <div>Companies</div>

                  <SourceLink title="Explore more on SBTi" link="#" />
                </div>
              }
              theme={cardTheme}
              contentFirst
            >
              {loading ? (
                <Loading light className={styles.loading} />
              ) : companiesNoData ? (
                renderNoData()
              ) : (
                <React.Fragment>
                  <div className={styles.statContainer}>
                    <Indicator {...indicators.company_target} />
                    <Indicator {...indicators.company_commited} />
                  </div>
                  <Chart
                    type="area"
                    config={companiesChartConfig}
                    data={companiesChartData}
                    height={200}
                    padding={noPadding}
                    loading={!citiesChartData}
                    includeTotalLine={false}
                    highlightLastPoint={false}
                    unit={false}
                    ghgChart={false}
                    formatValue={v => v}
                  />

                  <h3 className={styles.chartTitle}>
                    {indicators.company_target_qualification?.name}
                  </h3>

                  <div>
                    <div className={styles.targetsWrapper}>
                      {Object.keys(companiesChartConfig.theme).map(target => (
                        <div key={target}>
                          <Tag
                            color={companiesChartConfig.theme[target].fill}
                            theme={tagTheme}
                            label={target}
                          />
                          {latestCompaniesTargetQualification[target]}
                        </div>
                      ))}
                    </div>
                    {/* <Tag
                        color="#cccdcf"
                        theme={tagTheme}
                        label="Total Companies"
                        /> */}
                  </div>
                </React.Fragment>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

SubnationalActions.propTypes = {
  iso: PropTypes.string.isRequired,
  indicators: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default SubnationalActions;
