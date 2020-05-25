/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import CircularChart from 'components/circular-chart';
import ShareButton from 'components/button/share-button';
import ModalShare from 'components/modal-share';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './ndcs-lts-viz-styles.scss';

const getTooltip = (country, tooltipTxt) => (
  <Link className={tooltipTheme.container} to={`/ndcs/country/${country.id}`}>
    <div className={tooltipTheme.info}>
      <div className={tooltipTheme.countryName}>{country.name}</div>
      <p
        className={tooltipTheme.text}
        dangerouslySetInnerHTML={{ __html: tooltipTxt }}
      />
    </div>
    <Icon icon={accordionArrow} className={tooltipTheme.icon} />
  </Link>
);

const renderButtonGroup = (clickHandler, downloadLink) => (
  <div className={styles.containerControls}>
    <div>
      <p>
        <em>
          Explore which countries have submitted long-term strategies thus far
          below. Visit Climate Watch in the coming months for in-depth analysis
          of long-term strategies.
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
    <ShareButton className={styles.shareButton} />
    <ModalShare analyticsName="NDC Explore" />
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
    <div className={styles.circularChartLabels}>{datum.opts.label}</div>
  </div>
);

const NDCSLTSViz = ({
  loading,
  indicator,
  paths,
  tooltipTxt,
  downloadLink,
  countryData,
  summaryData,
  handleInfoClick,
  handleCountryClick,
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
                  {renderCircular(summaryData.submitted.countries)}
                  {renderCircular(summaryData.submitted.emissions)}
                </div>
              )}
            </div>
            <div className={styles.containerMap}>
              {loading && <Loading light className={styles.loader} />}
              {!isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
              <Map
                paths={paths}
                tooltipId="ndcs-map-tooltip"
                onCountryClick={handleCountryClick}
                onCountryEnter={handleCountryEnter}
                onCountryFocus={handleCountryEnter}
                dragEnable={false}
                customCenter={!isTablet ? [10, -10] : null}
              />
              {countryData && tooltipTxt.length > 0 && (
                <ReactTooltip
                  className={styles.tooltipContainer}
                  id="ndcs-map-tooltip"
                  delayHide={isTablet ? 0 : 3000}
                >
                  {getTooltip(countryData, tooltipTxt)}
                </ReactTooltip>
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

NDCSLTSViz.propTypes = {
  loading: PropTypes.bool,
  indicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  downloadLink: PropTypes.string,
  countryData: PropTypes.object,
  summaryData: PropTypes.object,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  mapColors: PropTypes.array
};

export default NDCSLTSViz;
