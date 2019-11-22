/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import Icon from 'components/icon';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import Dropdown from 'components/dropdown';
import { PieChart } from 'cw-components';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import handCursorIcon from 'assets/icons/hand-cursor.svg';
import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import styles from './lts-explore-map-styles.scss';

import LegendItem from './legend-item';
import CustomTooltip from './donut-tooltip';

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
  <div className={styles.summaryCardContainer}>
    <div className={styles.summaryCard}>
      <div className={styles.summaryCardValue}>
        <div>{summaryData.value}</div>
      </div>
      <div className={styles.summaryCardDescription}>
        {summaryData.description}
      </div>
    </div>
  </div>
);

const renderLegend = legendData => (
  <div className={styles.legendCardContainer}>
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
  </div>
);

class LTSExploreMap extends PureComponent {
  constructor() {
    super();
    this.state = {
      tooltipParentRef: null,
      pieChartRef: null
    };
  }

  renderDonutChart = emissionsCardData => (
    <div
      className={styles.donutContainer}
      ref={r => {
        this.setState({ pieChartRef: r });
      }}
    >
      <PieChart
        data={emissionsCardData.data}
        width={200}
        config={emissionsCardData.config}
        customTooltip={
          <CustomTooltip
            reference={this.state.tooltipParentRef}
            chartReference={this.state.pieChartRef}
            data={emissionsCardData.data}
          />
        }
        theme={{ pieChart: styles.pieChart }}
      />
    </div>
  );

  render() {
    const {
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
    } = this.props;

    return (
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
                <div
                  className={styles.containerCharts}
                  ref={r => {
                    this.setState({ tooltipParentRef: r });
                  }}
                >
                  {!loading && (
                    <React.Fragment>
                      {summaryCardData && renderSummary(summaryCardData)}
                      {emissionsCardData &&
                        this.renderDonutChart(emissionsCardData)}
                      {legendData && renderLegend(legendData)}
                    </React.Fragment>
                  )}
                </div>
                <div className={styles.containerMap}>
                  {loading && <Loading light className={styles.loader} />}
                  <p className={styles.mapInfo}>
                    <Icon
                      icon={handCursorIcon}
                      className={styles.handCursorIcon}
                    />
                    <span>
                      Explore which countries have submitted long-term
                      strategies thus far below. Visit Climate Watch in the
                      coming months for in-depth analysis of long-term
                      strategies.
                    </span>
                  </p>
                  <Map
                    paths={paths}
                    tooltipId="ndcs-map-tooltip"
                    onCountryClick={handleCountryClick}
                    onCountryEnter={handleCountryEnter}
                    onCountryFocus={handleCountryEnter}
                    zoomEnable
                    customCenter={!isTablet ? [10, 20] : [20, 20]}
                    theme={newMapTheme}
                    className={styles.map}
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
                  {!isTablet &&
                    renderButtonGroup(handleInfoClick, downloadLink)}
                </div>
              </div>
              <ModalMetadata />
            </div>
          )}
        </TabletLandscape>
      </div>
    );
  }
}

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
