/* eslint-disable no-confusing-arrow */

import React from 'react';
import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import { Chart, Tag } from 'cw-components';

import Card from 'components/card';

import CountryProfileIndicatorsProvider from 'providers/country-profile-indicators-provider';

import { CHART_COLORS } from 'data/constants';

import styles from './country-subnational-actions-styles.scss';

function mergeForChart({ data, mergeBy, labelKey, valueKey }) {
  if (!data || !data.length) return [];
  const dataObj = {};
  const keepOthersLast = d => (d[labelKey] === 'Others' ? -Infinity : d.value);
  const sorted = orderBy(data, ['date', keepOthersLast], ['asc', 'desc']);
  sorted.forEach(rd => {
    dataObj[rd[mergeBy]] = {
      x: rd[mergeBy],
      ...dataObj[rd[mergeBy]],
      [rd[labelKey]]: rd[valueKey]
    };
  });
  return sortBy(Object.values(dataObj), mergeBy);
}

function Indicator({ label, value }) {
  return (
    <div className={styles.actionIndicator}>
      <div className={styles.actionIndicatorValue}>{value}</div>
      <div className={styles.actionIndicatorLabel}>{label}</div>
    </div>
  );
}

Indicator.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string
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

function SubnationalActions({ iso, indicators }) {
  const cityCommited = indicators.city_commited?.value;
  const cityPopulation = Number(
    (indicators.city_ppl?.value || 0) / 1000000
  ).toFixed(2);
  const companyCommited = indicators.company_commited?.value;
  const companyTarget = indicators.company_target?.value;
  const citiesBadgeValues = (
    indicators.city_badge_type?.values || []
  ).map(x => ({ ...x, value: Number(x.value) }));
  const companyTargetQualValues = (
    indicators.company_target_qualification?.values || []
  ).map(x => ({ ...x, value: Number(x.value) }));
  const badges = uniq(citiesBadgeValues.map(x => x.category));
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
  const domain = {
    x: ['dataMin', 'dataMax'],
    y: ['auto', 'auto']
  };

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

  const citiesChartConfig = {
    axes: {
      xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
      yLeft: { format: 'number' }
    },
    animation: false,
    columns: {
      x: [{ label: 'Year', value: 'x' }],
      y: badges.map(b => ({ label: b, value: b }))
    },
    tooltip: getTooltipConfig(badges),
    theme: getTheme(badges)
  };
  const companyChartConfig = {
    axes: {
      xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
      yLeft: { format: 'number' }
    },
    animation: false,
    columns: {
      x: [{ label: 'Year', value: 'x' }],
      y: targets.map(b => ({ label: b, value: b }))
    },
    tooltip: getTooltipConfig(targets),
    theme: getTheme(targets)
  };

  const cardTheme = {
    title: styles.cardTitle,
    data: styles.cardData
  };

  const tagTheme = {
    tag: styles.tag
  };

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
              <div>
                <div className={styles.statContainer}>
                  <Indicator value={cityCommited} label="Cities Committed" />
                  <div className={styles.representing}>Representing</div>
                  <Indicator value={cityPopulation} label="Million People" />
                </div>

                <Chart
                  type="area"
                  config={citiesChartConfig}
                  domain={domain}
                  data={citiesChartData}
                  height={200}
                  loading={!citiesChartData}
                />

                <h3>{indicators.city_badge_type?.name}</h3>

                <div>
                  <p>Stages:</p>

                  <div className={styles.stagesWrapper}>
                    {Object.keys(citiesChartConfig.theme).map(badge => (
                      <Tag
                        color={citiesChartConfig.theme[badge].fill}
                        theme={tagTheme}
                        label={badge}
                      />
                    ))}
                  </div>
                  <Tag
                    color="#cccdcf"
                    theme={tagTheme}
                    label="Total Population"
                  />
                </div>
              </div>
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
              <div>
                <div className={styles.statContainer}>
                  <Indicator
                    value={companyTarget}
                    label="Companies Set a Target"
                  />
                  <Indicator
                    value={companyCommited}
                    label="Companies Committed"
                  />
                </div>
                <Chart
                  type="area"
                  config={companyChartConfig}
                  data={companiesChartData}
                  height={200}
                  loading={!citiesChartData}
                />

                <h3>{indicators.company_target_qualification?.name}</h3>

                <div>
                  <div className={styles.targetsWrapper}>
                    {Object.keys(companyChartConfig.theme).map(target => (
                      <div key={target}>
                        <Tag
                          color={companyChartConfig.theme[target].fill}
                          theme={tagTheme}
                          label={target}
                        />
                        {latestCompaniesTargetQualification[target]}
                      </div>
                    ))}
                  </div>
                  <Tag
                    color="#cccdcf"
                    theme={tagTheme}
                    label="Total Companies"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

SubnationalActions.propTypes = {
  iso: PropTypes.string.isRequired,
  indicators: PropTypes.object.isRequired
};

export default SubnationalActions;
