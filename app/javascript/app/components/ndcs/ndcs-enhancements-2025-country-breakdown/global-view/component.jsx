import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'cw-components';
import { timeFormat } from 'd3-time-format';

import NdcContentGlobalEmissionsProvider from 'providers/ndc-content-global-emissions-provider';
import ButtonGroup from 'components/button-group';
import ModalPngDownload from 'components/modal-png-download';

import GlobalChart from './global-chart';
import TagsComponent from './tags';
import { SETTINGS, CONDITIONAL_SWITCH_OPTIONS, TAGS_DATA } from './constants';

import styles from './styles.scss';

const GlobalViewComponent = props => {
  const [chartData, setChartData] = useState(undefined);
  const [conditionalNDC, setConditionalNDC] = useState(
    CONDITIONAL_SWITCH_OPTIONS[0]
  );

  const {
    data,
    pngDownloadId,
    handleInfoClick,
    handlePngDownloadModal
  } = props;

  const {
    historicalEmissions,
    projectedEmissions,
    policies,
    ndcs,
    targets: targetsData,
    lastUpdated
  } = data;

  // Calculating historical and projection chart data for display
  const historicalChartData = useMemo(
    () =>
      historicalEmissions
        ?.filter(({ year }) => year >= SETTINGS.chartMinYear)
        ?.map(({ year, value }) => ({
          x: year,
          y: value
        })),
    [historicalEmissions]
  );

  const projectionChartData = useMemo(
    () =>
      projectedEmissions?.map(({ year, value }) => ({
        x: year,
        y: value
      })),
    [historicalEmissions]
  );

  // Calculating reductions data for display on the 2030 and 2035 bars
  const reductionsData = useMemo(
    () => ({
      2030: {
        target: policies?.['2030'],
        actual: ndcs?.['2030']?.unconditional?.['2020']
      },
      2035: {
        target: ndcs?.['2030']?.unconditional?.['2020'],
        actual: ndcs?.['2035']?.[conditionalNDC?.value]?.['2025']
      }
    }),
    [ndcs, policies, conditionalNDC]
  );

  // Calculating target gaps data for bar display
  const targetGapsData = useMemo(
    () => ({
      upperLimit: {
        target: ndcs?.['2035']?.[conditionalNDC?.value]?.['2025'],
        actual: targetsData?.['2035']?.['2.0C']
      },
      lowerLimit: {
        target: ndcs?.['2035']?.[conditionalNDC?.value]?.['2025'],
        actual: targetsData?.['2035']?.['1.5C']
      }
    }),
    [conditionalNDC, ndcs, targetsData]
  );

  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdated) return null;
    return timeFormat('%B %d, %Y')(new Date(lastUpdated));
  }, [lastUpdated]);

  useEffect(() => {
    setChartData({
      historical: historicalChartData,
      projected: projectionChartData,
      targets: targetsData,
      reductions: reductionsData,
      targetGaps: targetGapsData,
      lastUpdated
    });
  }, [historicalChartData, projectionChartData, reductionsData, targetsData]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.summaryHeader}>
          <div className={styles.summaryDescription} />
          <div className={styles.buttonGroupContainer}>
            <ButtonGroup
              className={styles.buttonGroup}
              buttonsConfig={[
                {
                  type: 'info',
                  onClick: handleInfoClick
                },
                {
                  type: 'share',
                  shareUrl: '/embed/ndcs/global-emissions-reductions',
                  positionRight: true
                },
                {
                  type: 'downloadCombo',
                  options: [
                    {
                      label: 'Save as image (PNG)',
                      action: handlePngDownloadModal
                    }
                  ]
                }
              ]}
            />
          </div>
        </div>

        <div className={styles.chartOptionsContainer}>
          <Switch
            options={CONDITIONAL_SWITCH_OPTIONS}
            selectedOption={conditionalNDC.value}
            onClick={setConditionalNDC}
            theme={{
              wrapper: styles.switchWrapper,
              checkedOption: styles.switchSelected
            }}
          />
        </div>

        <GlobalChart data={chartData} />

        <div className={styles.tagsContainer}>
          <TagsComponent tags={TAGS_DATA} />
        </div>
        {formattedLastUpdated && (
          <div className={styles.lastUpdated}>
            Last updated on {formattedLastUpdated}
          </div>
        )}
      </div>
      <ModalPngDownload id={pngDownloadId}>
        <div>
          <GlobalChart type="png-download" data={chartData} />
          <div className={styles.tagsContainer}>
            <TagsComponent tags={TAGS_DATA} />
          </div>
          <span className={styles.spacer} />
        </div>
      </ModalPngDownload>
      <NdcContentGlobalEmissionsProvider />
    </>
  );
};

GlobalViewComponent.propTypes = {
  data: PropTypes.shape({
    historicalEmissions: PropTypes.object.isRequired,
    projectedEmissions: PropTypes.object.isRequired,
    targets: PropTypes.object.isRequired,
    policies: PropTypes.object.isRequired,
    ndcs: PropTypes.object.isRequired,
    lastUpdated: PropTypes.string.isRequired
  }).isRequired,
  pngDownloadId: PropTypes.string.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired
};

export default GlobalViewComponent;
