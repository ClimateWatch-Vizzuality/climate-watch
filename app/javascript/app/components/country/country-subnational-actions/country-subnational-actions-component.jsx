/* eslint-disable no-confusing-arrow, no-nested-ternary */

import React, { useMemo } from 'react';
import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';
import { format } from 'd3-format';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';
import InfoButton from 'components/button/info-button';
import NoContent from 'components/no-content';
import Card from 'components/card';
import Chart from 'components/charts/chart';
import Loading from 'components/loading';
import Icon from 'components/icon';
import externalLink from 'assets/icons/external-link.svg';

import {
  CHART_NAMED_EXTENDED_COLORS,
  CHART_NAMED_GRAY_COLORS,
  CONTINOUS_RAMP
} from 'app/styles/constants';

import Indicator from './indicator';
import { mergeForChart, getChartConfig } from './utils';
import styles from './country-subnational-actions-styles.scss';

const CITY_BADGES = {
  Joined: { color: CHART_NAMED_EXTENDED_COLORS.color1 },
  Inventory: { color: CHART_NAMED_EXTENDED_COLORS.color5 },
  Target: { color: CHART_NAMED_EXTENDED_COLORS.color4 },
  Plan: { color: CHART_NAMED_EXTENDED_COLORS.color3 },
  'Not Joined': { color: CHART_NAMED_GRAY_COLORS.grayColor1 }
};

const TARGETS = {
  Committed: { color: CONTINOUS_RAMP.color1 },
  '2°C': { color: CONTINOUS_RAMP.color2 },
  'Well-below 2°C': { color: CONTINOUS_RAMP.color3 },
  '1.5°C/Well-below 2°C': { color: CONTINOUS_RAMP.color4 },
  '1.5°C': { color: CONTINOUS_RAMP.color5 }
};

function SubnationalActions({
  indicators,
  iso,
  countries,
  loading,
  handleInfoClick
}) {
  const showByMillion = value => Number((value || 0) / 1000000).toFixed(2);

  // DATA TODO: Move to selector
  const citiesBadgeValues = (indicators.city_badge_type?.values || []).map(
    x => ({
      ...x,
      value: parseInt(x.value, 10)
    })
  );
  const keepNotJoinedLast = d =>
    d.category === 'Not Joined' ? -Infinity : d.value;
  const sortedCitiesBadgeValues = orderBy(
    citiesBadgeValues,
    ['year', keepNotJoinedLast],
    ['asc', 'desc']
  );
  const citiesChartData = mergeForChart({
    data: sortedCitiesBadgeValues,
    mergeBy: 'year',
    labelKey: 'category',
    valueKey: 'value'
  });
  const citiesChartConfig = {
    ...getChartConfig(Object.keys(CITY_BADGES)),
    theme: mapValues(CITY_BADGES, v => ({ fill: v.color, stroke: v.color }))
  };

  const companyTargetQualValues = (
    indicators.company_target_qualification?.values || []
  ).map(x => ({ ...x, value: parseInt(x.value, 10) }));

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
  const companiesChartConfig = {
    ...getChartConfig(Object.keys(TARGETS)),
    theme: mapValues(TARGETS, v => ({ fill: v.color, stroke: v.color }))
  };

  const cardTheme = {
    title: styles.cardTitle,
    data: styles.cardData
  };
  const tagTheme = {
    tag: styles.tag,
    label: styles.tagLabel
  };

  const noPadding = { left: 0, right: 0, top: 0, bottom: 0 };
  const tooltipConfig = { showTotal: true, sortByValue: false };

  const citiesNoData =
    !loading &&
    indicators.city_badge_type &&
    isEmpty(indicators.city_badge_type.values);
  const companiesNoData =
    !loading &&
    indicators.company_target_qualification &&
    isEmpty(indicators.company_target_qualification.values);

  // END OF DATA

  const renderNoData = () => <NoContent message="No data available" />;

  const countryName = useMemo(() => {
    if (!iso) return null;

    return (
      countries.find(({ iso_code3: countryISO }) => iso === countryISO) || {}
    ).wri_standard_name;
  }, [countries, iso]);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.container}>
          <h3 className={styles.title}>
            {`What are ${
              countryName && countryName.endsWith('s')
                ? `${countryName}'`
                : `${countryName}'s`
            } domestic climate actions?`}
          </h3>
          <div className={styles.descriptionContainer}>
            <p>
              Explore how national and sub-national actors, including regions,
              cities, companies, investors and other organizations, commit to
              act on climate change.
            </p>
          </div>
          <div className={styles.cardsContainer}>
            <Card
              title={
                <div className={styles.cardHeader}>
                  <div className={styles.titleContainer}>
                    <span className={styles.cardTitle}>Cities</span>
                    <InfoButton
                      className={styles.infoBtn}
                      infoOpen={false}
                      handleInfoClick={() =>
                        handleInfoClick(
                          indicators &&
                            indicators.city_badge_type &&
                            indicators.city_badge_type.metadata_source
                        )
                      }
                    />
                  </div>
                  <a
                    className={styles.sourceLink}
                    href="https://www.globalcovenantofmayors.org/our-cities/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore more on GCOM
                    <Icon icon={externalLink} className={styles.externalLink} />
                  </a>
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
                    height={300}
                    padding={noPadding}
                    loading={!citiesChartData}
                    includeTotalLine={false}
                    highlightLastPoint={false}
                    unit={false}
                    ghgChart={false}
                    tooltipConfig={tooltipConfig}
                    formatValue={v => format('.2s')(v).replace('G', 'B')}
                    yTickFormatter={v => format('.2s')(v).replace('G', 'B')}
                  />

                  <h3 className={styles.chartTitle}>
                    {indicators.city_badge_type?.name}
                  </h3>

                  <div className={styles.stagesContainer}>
                    <p>Stages:</p>

                    <div className={styles.stages}>
                      {Object.keys(CITY_BADGES)
                        .filter(b => b !== 'Not Joined')
                        .map(badge => (
                          <Tag
                            key={badge}
                            color={citiesChartConfig.theme[badge].fill}
                            theme={tagTheme}
                            label={badge}
                          />
                        ))}
                    </div>

                    <div className={styles.citiesTotalPopulationTag}>
                      <Tag
                        color={CITY_BADGES['Not Joined'].color}
                        theme={tagTheme}
                        label="Total Population"
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </Card>
            <Card
              title={
                <div className={styles.cardHeader}>
                  <div className={styles.titleContainer}>
                    <span className={styles.cardTitle}>Companies</span>
                    <InfoButton
                      className={styles.infoBtn}
                      infoOpen={false}
                      handleInfoClick={() =>
                        handleInfoClick(
                          indicators &&
                            indicators.company_target_qualification &&
                            indicators.company_target_qualification
                              .metadata_source
                        )
                      }
                    />
                  </div>
                  <a
                    className={styles.sourceLink}
                    href="https://sciencebasedtargets.org/companies-taking-action"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore more on SBTi
                    <Icon icon={externalLink} className={styles.externalLink} />
                  </a>
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
                    <Indicator {...indicators.company_commited} />
                    <Indicator {...indicators.company_target} />
                  </div>
                  <Chart
                    type="area"
                    config={companiesChartConfig}
                    data={companiesChartData}
                    height={300}
                    padding={noPadding}
                    loading={!citiesChartData}
                    includeTotalLine={false}
                    highlightLastPoint={false}
                    unit={false}
                    ghgChart={false}
                    tooltipConfig={tooltipConfig}
                    formatValue={v => v}
                  />

                  <h3 className={styles.chartTitle}>
                    {indicators.company_target_qualification?.name}
                  </h3>

                  <div>
                    <div className={styles.targetsWrapper}>
                      {Object.keys(TARGETS).map(target => (
                        <div key={target}>
                          <Tag
                            color={companiesChartConfig.theme[target].fill}
                            theme={tagTheme}
                            label={target}
                          />
                          {latestCompaniesTargetQualification &&
                            latestCompaniesTargetQualification[target]}
                        </div>
                      ))}
                    </div>
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
  countries: PropTypes.array,
  iso: PropTypes.string,
  indicators: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleInfoClick: PropTypes.func.isRequired
};

export default SubnationalActions;
