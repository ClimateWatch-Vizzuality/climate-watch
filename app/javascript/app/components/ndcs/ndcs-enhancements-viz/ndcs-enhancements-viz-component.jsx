import React from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import CircularChart from 'components/circular-chart';
import NDCSEnhancementsTooltip from 'components/ndcs/ndcs-enhancements-viz/ndcs-enhancements-tooltip';

import styles from './ndcs-enhancements-viz-styles.scss';

const renderButtonGroup = (clickHandler, downloadLink) => (
  <div className={styles.containerControls}>
    <div>
      <p>
        <em>
          Explore the data to track which countries have signaled they will
          update or enhance their national climate commitments (NDCs) by 2020.
          To request changes or additions, please contact &nbsp;
          <a
            href="mailto:Rhys.Gerholdt@wri.org?subject=2020 NDC Tracker Update"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rhys Gerholdt
          </a>
          .
        </em>
      </p>
    </div>
    <div>
      <ButtonGroup
        className={styles.buttonGroup}
        buttonsConfig={[
          {
            type: 'info',
            onClick: clickHandler
          },
          {
            type: 'share',
            shareUrl: '/embed/2020-ndc-tracker',
            analyticsGraphName: 'Ndcs',
            positionRight: true
          },
          {
            type: 'download',
            section: 'ndcs-content',
            link: downloadLink
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    </div>
  </div>
);

const renderCircular = datum => (
  <div className={styles.circularChartContainer}>
    <div>
      <CircularChart
        index={0.1}
        value={Math.round((datum.value / datum.max) * 100 * 10) / 10}
        color={datum.opts.color}
      />
      <div className={styles.circularChartValues}>
        <div
          style={{
            color: datum.opts.color
          }}
        >
          {datum.opts.prefix}
          {datum.value}
          {datum.opts.suffix}
        </div>
      </div>
    </div>
    <div className={styles.circularChartLabels}>
      <div dangerouslySetInnerHTML={{ __html: datum.opts.label }} />
    </div>
  </div>
);

const TOOLTIP_ID = 'ndcs-map-tooltip';

const NDCSEnhancementsViz = ({
  loading,
  indicator,
  paths,
  tooltipValues,
  downloadLink,
  countryData,
  summaryData,
  handleInfoClick,
  handleCountryEnter,
  mapColors
}) => (
  <div>
    <TabletLandscape>
      {isTablet => (
        <div className={styles.wrapper}>
          <div className={styles.filtersLayout}>
            {isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
          </div>

          <div className={styles.containerUpper}>
            <div className={styles.containerCharts}>
              {!loading && summaryData && (
                <div>
                  {renderCircular(summaryData.intend_2020.countries)}
                  {renderCircular(summaryData.enhance_2020.countries)}
                  {renderCircular(summaryData.submitted_2020.countries)}
                </div>
              )}
            </div>
            <div className={styles.containerMap}>
              {loading && <Loading light className={styles.loader} />}
              {!isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
              <Map
                paths={paths}
                tooltipId={TOOLTIP_ID}
                onCountryEnter={handleCountryEnter}
                onCountryFocus={handleCountryEnter}
                zoomEnable
                customCenter={!isTablet ? [10, -10] : null}
              />
              {countryData && tooltipValues && (
                <NDCSEnhancementsTooltip
                  id={TOOLTIP_ID}
                  tooltipValues={tooltipValues}
                />
              )}
              {indicator && (
                <MapLegend
                  className={styles.legend}
                  title={indicator.legend}
                  buckets={indicator.legendBuckets}
                  mapColors={mapColors}
                />
              )}
            </div>
          </div>
          <ModalMetadata />
        </div>
      )}
    </TabletLandscape>
  </div>
);

NDCSEnhancementsViz.propTypes = {
  loading: PropTypes.bool,
  indicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipValues: PropTypes.object,
  downloadLink: PropTypes.string,
  countryData: PropTypes.object,
  summaryData: PropTypes.object,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  mapColors: PropTypes.array
};

export default NDCSEnhancementsViz;
