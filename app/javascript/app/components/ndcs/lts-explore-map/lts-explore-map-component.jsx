/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import { PieChart } from 'cw-components';
import Map from 'components/map';
import Icon from 'components/icon';
import ButtonGroup from 'components/button-group';
import Progress from 'components/progress';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import Dropdown from 'components/dropdown';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';

import handCursorIcon from 'assets/icons/hand-cursor.svg';
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

const renderSummary = summaryData => (
  <div className={styles.summaryCard}>
    <div className={styles.summaryCardValue}>
      <div>{summaryData.value}</div>
    </div>
    <div className={styles.summaryCardDescription}>
      {summaryData.description}
    </div>
  </div>
);

const renderDonutCard = emissionsData => (
  <div className={styles.circularChartContainer}>
    <PieChart
      data={emissionsData.data}
      width={600}
      config={emissionsData.config}
    />
  </div>
);

const LegendItem = ({ name, partiesNumber, value, color }) => (
  <div className={styles.legendItem}>
    <div>
      <span className={styles.legendDot} style={{ backgroundColor: color }} />
      {name}
    </div>
    <div className={styles.progressContainer}>
      <Progress value={value} className={styles.progressBar} color={color} />
      <div className={styles.partiesNumber}>
        {partiesNumber} {partiesNumber === 1 ? 'party' : 'parties'}
      </div>
    </div>
  </div>
);

LegendItem.propTypes = {
  name: PropTypes.string,
  partiesNumber: PropTypes.number,
  value: PropTypes.number,
  color: PropTypes.string
};

const renderLegend = legendData => (
  <div className={styles.legendContainer}>
    {legendData &&
      legendData.map(l => (
        <LegendItem
          key={l.name}
          name={l.name}
          partiesNumber={l.partiesNumber}
          value={l.value}
          color={l.color}
        />
      ))}
  </div>
);

const LTSExploreMap = ({
  loading,
  paths,
  tooltipTxt,
  downloadLink,
  countryData,
  emissionsCardData,
  summaryCardData,
  legendData,
  handleInfoClick,
  handleCountryClick,
  handleCountryEnter,
  categories,
  indicators,
  selectedIndicator,
  handleCategoryChange,
  selectedCategory,
  handleIndicatorChange
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
              {!loading && (
                <React.Fragment>
                  {summaryCardData && renderSummary(summaryCardData)}
                  {emissionsCardData && renderDonutCard(emissionsCardData)}
                  {legendData && renderLegend(legendData)}
                </React.Fragment>
              )}
            </div>
            <div className={styles.containerMap}>
              {loading && <Loading light className={styles.loader} />}
              <p className={styles.mapInfo}>
                <Icon icon={handCursorIcon} className={styles.handCursorIcon} />
                <span>
                  Explore which countries have submitted long-term strategies
                  thus far below. Visit Climate Watch in the coming months for
                  in-depth analysis of long-term strategies.
                </span>
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
          <EmissionsMetaProvider />
          {/* TODO: Get source and gas */}
          <EmissionsProvider
            filters={{
              source: 8,
              gas: 25
            }}
          />
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
  emissionsCardData: PropTypes.object,
  summaryCardData: PropTypes.object,
  legendData: PropTypes.array,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  selectedIndicator: PropTypes.object,
  handleCategoryChange: PropTypes.func,
  selectedCategory: PropTypes.object,
  handleIndicatorChange: PropTypes.func
};

export default LTSExploreMap;
