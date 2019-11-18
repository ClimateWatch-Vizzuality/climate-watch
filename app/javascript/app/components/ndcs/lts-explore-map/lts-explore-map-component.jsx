/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import ButtonGroup from 'components/button-group';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import CircularChart from 'components/circular-chart';
import Dropdown from 'components/dropdown';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import styles from './lts-explore-map-styles.scss';

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
  <ButtonGroup
    className={styles.buttonGroup}
    buttonsConfig={[
      {
        type: 'info',
        onClick: clickHandler
      },
      {
        type: 'share',
        shareUrl: '/embed/ndcs-lts',
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

const LTSExploreMap = ({
  loading,
  paths,
  tooltipTxt,
  downloadLink,
  countryData,
  summaryData,
  handleInfoClick,
  handleCountryClick,
  handleCountryEnter,
  categories,
  indicators,
  handleCategoryChange,
  selectedCategory,
  handleIndicatorChange,
  selectedIndicator
}) => (
  <div>
    <TabletLandscape>
      {isTablet => (
        <div className={styles.wrapper}>
          <div className={styles.filtersLayout}>
            <div className={styles.filtersGroup}>
              <Dropdown
                label="Category"
                paceholder="Select a category"
                options={categories}
                onValueChange={handleCategoryChange}
                value={selectedCategory}
                hideResetButton
                plain
              />
              <Dropdown
                label="Indicator"
                options={indicators}
                onValueChange={handleIndicatorChange}
                value={selectedIndicator}
                hideResetButton
                plain
              />
            </div>
            {isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
          </div>
          <div className={styles.containerUpper}>
            <div className={styles.containerCharts}>
              {!loading && summaryData && summaryData.submitted && (
                <div>
                  {renderCircular(summaryData.submitted.countries)}
                  {renderCircular(summaryData.submitted.emissions)}
                </div>
              )}
            </div>
            <div className={styles.containerMap}>
              {loading && <Loading light className={styles.loader} />}
              <p className={styles.mapInfo}>
                Explore which countries have submitted long-term strategies thus
                far below. Visit Climate Watch in the coming months for in-depth
                analysis of long-term strategies.
              </p>
              <Map
                paths={paths}
                tooltipId="ndcs-map-tooltip"
                onCountryClick={handleCountryClick}
                onCountryEnter={handleCountryEnter}
                onCountryFocus={handleCountryEnter}
                zoomEnable
                customCenter={!isTablet ? [10, 40] : [20, 40]}
                theme={newMapTheme}
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
              {!isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
            </div>
          </div>
          <ModalMetadata />
        </div>
      )}
    </TabletLandscape>
  </div>
);

LTSExploreMap.propTypes = {
  loading: PropTypes.bool,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  downloadLink: PropTypes.string,
  countryData: PropTypes.object,
  summaryData: PropTypes.object,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  handleCategoryChange: PropTypes.func,
  selectedCategory: PropTypes.object,
  handleIndicatorChange: PropTypes.func,
  selectedIndicator: PropTypes.object
};

export default LTSExploreMap;
