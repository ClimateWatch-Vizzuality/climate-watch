/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { groupBy } from 'lodash';
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

const downloadLink = generateLinkToDataExplorer(
  { category: '2025_ndc_tracker' },
  'ndc-content'
);

const Ndc2025TrackerChartComponent = props => {
  const { handleInfoClick, handlePngDownloadModal, data: _data } = props;

  const [selectedType, setSelectedType] = React.useState('emissions');
  const [hoveredBar, setHoveredBar] = React.useState(null);
  const submittedTexts = [
    'Submitted 2025 NDC',
    'Submitted 2025 NDC with 2030 target'
  ];

  const data = React.useMemo(() => {
    if (!_data) return null;
    const dataGroups = Object.values(
      groupBy(_data, d =>
        submittedTexts.includes(d.indc_submission)
          ? 'submitted'
          : 'notSubmitted'
      )
    );

    const sortedData = dataGroups.map(group =>
      group.sort((a, b) => {
        if (selectedType === 'submission_date') {
          return new Date(a.submission_date) - new Date(b.submission_date);
        }
        return b.ndce_ghg - a.ndce_ghg;
      })
    );

    const sortedBarsGrouped = sortedData.map((group, index) =>
      group.reduce(
        (acc, d, i) => [
          ...acc,
          { ...d, index: `${sortedData[0].length * index + i}` }
        ],
        []
      )
    );
    const sortedBars = sortedBarsGrouped.flat();
    const emissionsData = [
      {
        ...sortedBars.reduce(
          (acc, d) => ({ ...acc, [d.index]: getEmissionValue(d.ndce_ghg) }),
          {}
        ),
        name: 'emissions'
      }
    ];
    return { emissionsData, sortedBars };
  }, [selectedType, _data]);

  const hasBeenSubmitted = d => submittedTexts.includes(d.indc_submission);
  const totalCountriesSubmitted = _data?.filter(d =>
    submittedTexts.includes(d.indc_submission)
  ).length;
  const totalCountriesNotSubmitted = _data?.length - totalCountriesSubmitted;

  const totalEmissionsSubmitted = _data
    ?.filter(hasBeenSubmitted)
    .reduce((acc, d) => acc + getEmissionValue(d.ndce_ghg), 0)
    .toFixed(0);

  const totalEmissionsNotSubmitted = _data
    ?.filter(hasBeenSubmitted)
    .reduce((acc, d) => acc + getEmissionValue(d.ndce_ghg), 0)
    .toFixed(0);

  if (!data) return null;

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
                  type: 'info',
                  onClick: handleInfoClick
                },
                {
                  type: 'share',
                  shareUrl: '/embed/2025-ndc-tracker',
                  analyticsGraphName: 'Ndcs',
                  positionRight: true
                },
                {
                  type: 'downloadCombo',
                  options: [
                    {
                      label: 'Save as image (PNG)',
                      action: handlePngDownloadModal
                    },
                    {
                      label: 'Go to data explorer',
                      link: downloadLink,
                      target: '_self'
                    }
                  ]
                }
              ]}
            />
          </div>
          <p>
            Track which countries are submitting an updated version of their
            NDC--a 2025 NDC. You can compare countries’ submissions side by side{' '}
            <Link to="TODO-ADD_LINK_HERE">here</Link> or by referring to the
            table below. To request changes or additions, please contact{' '}
            <a target="_blank" href="TODO-ADD_LINK_HERE">
              Mengpin Ge
            </a>
            .
          </p>
        </div>
        <div className={styles.cards}>
          <p />
          <p className={styles.submitted}>Submitted 2025 NDC</p>
          <p className={styles.notSubmitted}>No 2025 NDC</p>
          <p>Total Countries</p>
          <p className={classNames(styles.bigCard, styles.submitted)}>
            {totalCountriesSubmitted}
          </p>
          <p className={classNames(styles.bigCard, styles.notSubmitted)}>
            {totalCountriesNotSubmitted}
          </p>
          <p>Global Emissions</p>
          <p className={classNames(styles.smallCard, styles.submitted)}>
            {totalEmissionsSubmitted}%
          </p>
          <p className={classNames(styles.smallCard, styles.notSubmitted)}>
            {totalEmissionsNotSubmitted}%
          </p>
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
                      label: 'Latest NDC submission',
                      value: 'submission_date'
                    },
                    { label: 'Total emissions', value: 'emissions' }
                  ]}
                  selectedOption={selectedType}
                  onClick={a => setSelectedType(a.value)}
                  theme={{
                    wrapper: styles.switchWrapper,
                    checkedOption: styles.switchSelected
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
              data={data?.emissionsData}
              maxBarSize={100}
              margin={{
                top: 0,
                bottom: 0
              }}
            >
              <XAxis domain={[0, 100]} hide type="number" />
              <YAxis hide dataKey="emissions" type="category" />
              <Tooltip
                content={() => (
                  <div className={styles.barChartTooltip}>
                    <p>{hoveredBar?.country}</p>
                    <p>
                      GHG Emissions:{' '}
                      <span>{hoveredBar?.ndce_ghg?.toFixed(2)}%</span>
                    </p>
                    <p>
                      Submission date:{' '}
                      <span>{hoveredBar?.submission_date}</span>
                    </p>
                  </div>
                )}
                offset={0}
                cursor={false}
              />
              {data?.sortedBars.map((d, i) => (
                <Bar
                  onMouseEnter={() => setHoveredBar(getEmissionValue(d))}
                  onMouseLeave={() => setHoveredBar(false)}
                  key={d.iso}
                  className={classNames(
                    styles.barChartBar,
                    hasBeenSubmitted(d)
                      ? styles.submitted
                      : styles.notSubmitted,
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
