/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import Dropdown from 'components/dropdown';
import { PieChart } from 'cw-components';
import CustomTooltip from 'components/ndcs/shared/donut-tooltip';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import CustomInnerHoverLabel from 'components/ndcs/shared/donut-custom-label';
import LegendItem from 'components/ndcs/shared/legend-item';
import ShareButton from 'components/button/share-button';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import layout from 'styles/layout.scss';
import styles from './ndcs-explore-map-styles.scss';

const renderButtonGroup = (clickHandler, downloadLink) => (
  <div className={styles.buttonGroupContainer}>
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
    <ShareButton analyticsName="NDC Explore" sharePath="/embed/ndcs-explore" />
  </div>
);

const renderSummary = summaryData => (
  <div className={styles.summaryCardContainer}>
    <div className={styles.summaryCard}>
      {summaryData.map(summarySentence => (
        <div className={styles.summarySentence}>
          <div className={styles.summaryCardValue}>{summarySentence.value}</div>
          <div className={styles.summaryCardDescription}>
            {summarySentence.description}
          </div>
        </div>
      ))}
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

class NDCSExploreMap extends PureComponent {
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
        customInnerHoverLabel={CustomInnerHoverLabel}
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
              <div className={layout.content}>
                <div className="grid-column-item">
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
                    {isTablet &&
                      renderButtonGroup(handleInfoClick, downloadLink)}
                  </div>
                </div>
              </div>
              <div className={styles.containerUpperWrapper}>
                <div className={layout.content}>
                  <div className="grid-column-item">
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
                        <HandIconInfo
                          className={styles.mapInfo}
                          text="Explore the interactive map to understand which
                            countries have submitted new or updated NDCs."
                        />
                        <Map
                          paths={paths}
                          tooltipId="ndcs-map-tooltip"
                          onCountryClick={handleCountryClick}
                          onCountryEnter={handleCountryEnter}
                          onCountryFocus={handleCountryEnter}
                          zoomEnable
                          customCenter={isTablet ? [20, 20] : [10, 20]}
                          theme={newMapTheme}
                          className={styles.map}
                        />
                        {countryData && (
                          <ReactTooltip
                            className={styles.tooltipContainer}
                            id="ndcs-map-tooltip"
                            delayHide={isTablet ? 0 : 3000}
                          >
                            <button
                              onClick={() =>
                                handleCountryClick(null, countryData)
                              }
                              className={tooltipTheme.container}
                            >
                              <div
                                className={cx(
                                  tooltipTheme.countryName,
                                  tooltipTheme.link
                                )}
                              >
                                {countryData.name}
                              </div>
                            </button>
                          </ReactTooltip>
                        )}
                        {!isTablet &&
                          renderButtonGroup(handleInfoClick, downloadLink)}
                      </div>
                    </div>
                    <ModalMetadata />
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabletLandscape>
      </div>
    );
  }
}

NDCSExploreMap.propTypes = {
  loading: PropTypes.bool,
  paths: PropTypes.array.isRequired,
  downloadLink: PropTypes.string,
  countryData: PropTypes.object,
  emissionsCardData: PropTypes.object,
  summaryCardData: PropTypes.array,
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

export default NDCSExploreMap;
