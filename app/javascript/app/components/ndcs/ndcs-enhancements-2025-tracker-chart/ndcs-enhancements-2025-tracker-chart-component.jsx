/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import layout from 'styles/layout';
import classNames from 'classnames';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Switch } from 'cw-components';
import { Link } from 'react-router-dom';
import ButtonGroup from 'components/button-group';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import ModalMetadata from 'components/modal-metadata';
import MetadataProvider from 'providers/metadata-provider';
import styles from './ndcs-enhancements-2025-tracker-chart-styles.scss';

const SUBMISSION_TYPES = {
  submittedWith2030And2035: 'Submitted 2025 NDC with 2030 and 2035 targets',
  submittedWith2030: 'Submitted 2025 NDC with 2030 target',
  submitted2025: 'Submitted 2025 NDC',
  notSubmitted: 'Not Submitted'
};

const Ndc2025TrackerChartComponent = props => {
  const { handleInfoClick, handlePngDownloadModal, data } = props;

  const [sortedBy, setSortedBy] = React.useState('emissions');
  const [hoveredBar, setHoveredBar] = React.useState(null);

  // Get emission value from 'ndce_ghg' string and convert it into numeric format
  const getEmissionValue = emissionStr => {
    if (!emissionStr) {
      return 0;
    }
    const emission = emissionStr.replace('%', '');
    if (Number.isNaN(Number(emission))) {
      return 0;
    }
    return Number(emission);
  };

  // Helper to select the correct fill style for the bar colors
  const getCountrySubmissionTypeKey = country =>
    Object.keys(SUBMISSION_TYPES).find(
      key => SUBMISSION_TYPES[key] === country.indc_submission
    ) || 'notSubmitted';

  // Parse data in order to include the `emissions` property in a number format
  const parsedData = React.useMemo(() =>
    (data || []).map(country => ({
      ...country,
      emissions: getEmissionValue(country.ndce_ghg) || 0
    }))
  );

  // Group countries by submission type
  const countriesBySubmissionType = React.useMemo(() => {
    const findCountriesBySubmissionType = submissionType =>
      parsedData?.filter(
        // Don't include EU countries in the chart; instead we account for EUU
        ({ indc_submission, is_in_eu }) =>
          !is_in_eu && indc_submission === submissionType
      );

    return Object.entries(SUBMISSION_TYPES).reduce(
      (acc, [key, submissionType]) => ({
        ...acc,
        [key]: findCountriesBySubmissionType(submissionType)
      }),
      {}
    );
  });

  // Calculate statistics per submission type
  const submissionTypeStatistics = React.useMemo(() => {
    const globalEmissionsBySubmissionType = submissionType => {
      const countries = countriesBySubmissionType[submissionType] || [];
      return countries.reduce((acc, country) => acc + country.emissions, 0);
    };

    return Object.keys(SUBMISSION_TYPES).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          numCountries: countriesBySubmissionType[key]?.length || 0,
          emissionsPerc: globalEmissionsBySubmissionType(key) || 0
        }
      }),
      {}
    );
  });

  const cardsData = React.useMemo(() => {
    // Get keys to calculate cards' data. "Not submitted" will be calculated by hand, as it'll depend
    // on the remaining values in order to ensure percentages don't add up to more than 100%.
    const submissionTypesKeys = Object.keys(SUBMISSION_TYPES).filter((key) => key !== 'notSubmitted');

    const submittedTypesData = submissionTypesKeys.reduce(
      (acc, key) => {
        const stats = submissionTypeStatistics[key];
        return {
          ...acc,
          [key]: {
            numCountries: stats.numCountries.toFixed(0),
            emissionsPerc: stats.emissionsPerc.toFixed(0)
          }
        };
      },
      {}
    );

    const allSubmittedTypesPerc = Object.values(submittedTypesData).reduce((acc, d) => acc + d?.emissionsPerc || 0, 0);

    return {
      ...submittedTypesData,
      notSubmitted: {
        numCountries: submissionTypeStatistics.notSubmitted.numCountries,
        emissionsPerc: 100 - allSubmittedTypesPerc // Ensure it won't cause values to go over 100%
      }
    };
  });

  // Parse data to create a chart display
  // We do not want to display EU countries in the chart; instead we do EUU.
  const chartData = React.useMemo(() => {
    const parsedDataWithoutEuCountries = parsedData.filter(
      country => country.is_in_eu === false
    );

    let sortedData = parsedDataWithoutEuCountries || [];
    if (sortedBy === 'submission_date') {
      sortedData = sortedData.sort((a, b) => {
        if (a.submission_date === b.submission_date) return 0;
        if (!a.submission_date) return 1;
        if (!b.submission_date) return -1;
        return new Date(b.submission_date) - new Date(a.submission_date);
      });
    } else if (sortedBy === 'emissions') {
      sortedData = sortedData.sort((a, b) => b[sortedBy] - a[sortedBy]);
    }

    const barsData = sortedData.map((country, idx) => ({
      ...country,
      index: idx
    }));

    const emissionsData = [
      Object.assign(
        {},
        (barsData || []).map(country => country.emissions)
      )
    ];

    return {
      barsData,
      emissionsData
    };
  });

  // Generate data explorer link
  const downloadLink = generateLinkToDataExplorer(
    { category: '2025_ndc_tracker' },
    'ndc-content'
  );

  if (!parsedData) return null;

  // Quick helpers to simplify rendering cards
  const renderCardHead = (key, title, subtitle) => (
    <p className={styles[key]}>
      {title}
      {subtitle && <span>{subtitle}</span>}
    </p>
  );

  const renderCard = (key, property, style) => (
    <p className={classNames(style, styles[key])}>
      {cardsData[key][property]}
      {property === 'emissionsPerc' && <>%</>}
    </p>
  );

  return (
    <div className={styles.wrapper}>
      <div className={layout.content}>
        <div className={styles.summary}>
          <div className={styles.summaryHeader}>
            <h2>What countries have submitted a 2025 NDC?</h2>
            <ButtonGroup
              className={styles.buttonGroup}
              dataTour="ndc-enhancement-tracker-04"
              buttonsConfig={[
                {
                  type: "info",
                  onClick: handleInfoClick,
                },
                {
                  type: "share",
                  shareUrl: "/embed/2025-ndc-tracker",
                  analyticsGraphName: "Ndcs",
                  positionRight: true,
                },
                {
                  type: "downloadCombo",
                  options: [
                    {
                      label: "Save as image (PNG)",
                      action: handlePngDownloadModal,
                    },
                    {
                      label: "Go to data explorer",
                      link: downloadLink,
                      target: "_self",
                    },
                  ],
                },
              ]}
            />
          </div>
          <p>
            Track which countries are submitting an updated version of their
            NDC--a 2025 NDC. You can compare countries’ submissions side by side{" "}
            <Link
              to="custom-compare/overview"
              title="Compare submissions"
              target="_blank"
            >
              here
            </Link>{" "}
            or by referring to the table below. To request changes or additions,
            please contact{" "}
            <a
              href="mailto:Mengpin.Ge@wri.org?subject=NDC 2025 Tracker Update"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mengpin Ge
            </a>
            .
          </p>
        </div>
        <div className={styles.cards}>
          <p />
          {renderCardHead(
            "submittedWith2030",
            "2025 NDCs",
            "with 2030 and 2035 targets"
          )}
          {renderCardHead("submittedWith2030", "2025 NDCs", "with 2030 target")}
          {renderCardHead(
            "submitted2025",
            "2025 NDCs",
          )}
          {renderCardHead(
            "notSubmitted",
            "No 2025 NDCs",
          )}

          <p>Total Countries</p>
          {renderCard(
            "submittedWith2030And2035",
            "numCountries",
            styles.bigCard
          )}
          {renderCard("submittedWith2030", "numCountries", styles.bigCard)}
          {renderCard("submitted2025", "numCountries", styles.bigCard)}
          {renderCard("notSubmitted", "numCountries", styles.bigCard)}
          <p>Global Emissions</p>
          {renderCard(
            "submittedWith2030And2035",
            "emissionsPerc",
            styles.smallCard
          )}
          {renderCard("submittedWith2030", "emissionsPerc", styles.smallCard)}
          {renderCard("submitted2025", "emissionsPerc", styles.smallCard)}
          {renderCard("notSubmitted", "emissionsPerc", styles.smallCard)}
        </div>
        <div className={styles.ndc2025TrackerChart}>
          <div className={styles.title}>
            <h3>Countries’ GHG Emissions Breakdown</h3>
            <div className={styles.switchTitle}>
              <span>Sort countries by:</span>
              <div>
                <label htmlFor="submission_date">
                  <span>Latest NDC submission</span>
                </label>
                <Switch
                  options={[
                    {
                      label: "Latest NDC submission",
                      value: "submission_date",
                    },
                    { label: "Total emissions", value: "emissions" },
                  ]}
                  selectedOption={sortedBy}
                  onClick={(a) => setSortedBy(a.value)}
                  theme={{
                    wrapper: styles.switchWrapper,
                    checkedOption: styles.switchSelected,
                  }}
                />
                <label htmlFor="emissions">
                  <span>Total emissions</span>
                </label>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={60}>
            <BarChart
              className={styles.barChart}
              layout="vertical"
              data={chartData.emissionsData}
              maxBarSize={100}
              margin={{
                top: 0,
                bottom: 0,
              }}
            >
              <XAxis domain={[0, 100]} hide type="number" />
              <YAxis hide dataKey="emissions" type="category" />
              <Tooltip
                content={() => (
                  <div className={styles.barChartTooltip}>
                    <p>{hoveredBar?.country}</p>
                    <p>
                      GHG Emissions: <span>{hoveredBar?.ndce_ghg}</span>
                    </p>
                    <p>
                      <span>{hoveredBar?.indc_submission}</span>
                    </p>
                  </div>
                )}
                offset={0}
                cursor={false}
              />
              {chartData?.barsData.map((d, i) => (
                <Bar
                  onMouseEnter={() => setHoveredBar(d)}
                  onMouseLeave={() => setHoveredBar(false)}
                  key={d.iso}
                  className={classNames(
                    styles.barChartBar,
                    styles[getCountrySubmissionTypeKey(d)],
                    hoveredBar?.iso === d.iso && styles.barChartBarHovered
                  )}
                  dataKey={`${i}`}
                  stackId="emissions"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ModalMetadata />
      <MetadataProvider source="ndc_cw" />
    </div>
  );
};

Ndc2025TrackerChartComponent.propTypes = {
  // metadata: PropTypes.array,
  data: PropTypes.array,
  // pngDownloadId: PropTypes.string.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired
};

export default Ndc2025TrackerChartComponent;
