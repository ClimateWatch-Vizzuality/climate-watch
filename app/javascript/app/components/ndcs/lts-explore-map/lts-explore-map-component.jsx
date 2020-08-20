/* eslint-disable react/no-danger */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import Dropdown from 'components/dropdown';
import { PieChart, CheckInput } from 'cw-components';
import CustomTooltip from 'components/ndcs/shared/donut-tooltip';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import CustomInnerHoverLabel from 'components/ndcs/shared/donut-custom-label';
import LegendItem from 'components/ndcs/shared/legend-item';
import ShareButton from 'components/button/share-button';
import ExploreMapTooltip from 'components/ndcs/shared/explore-map-tooltip';
import ModalShare from 'components/modal-share';
import Sticky from 'react-stickynode';
import cx from 'classnames';
import { getHoverIndex } from 'components/ndcs/shared/utils';

import layout from 'styles/layout.scss';
import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import styles from './lts-explore-map-styles.scss';

const renderButtonGroup = (clickHandler, downloadLink, stickyStatus) => (
  <div
    className={cx(styles.buttonGroupContainer, {
      [styles.padded]: stickyStatus !== Sticky.STATUS_ORIGINAL
    })}
  >
    <ButtonGroup
      className={styles.buttonGroup}
      buttonsConfig={[
        {
          type: 'info',
          onClick: clickHandler
        },
        {
          type: 'download',
          section: 'lts-explore',
          link: downloadLink
        },
        {
          type: 'addToUser'
        }
      ]}
    />
    <ShareButton />
    <ModalShare analyticsName="LTS Explore" />
  </div>
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

const renderLegend = (legendData, emissionsCardData) => (
  <div className={styles.legendCardContainer}>
    <div className={styles.legendContainer}>
      {legendData &&
        legendData.map(l => (
          <LegendItem
            key={l.name}
            hoverIndex={
              emissionsCardData &&
              emissionsCardData.data &&
              getHoverIndex(emissionsCardData, l)
            }
            name={l.name}
            number={l.countriesNumber}
            value={l.value}
            color={l.color}
          />
        ))}
    </div>
  </div>
);

function LTSExploreMap(props) {
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
    handleIndicatorChange,
    handleOnChangeChecked,
    checked,
    tooltipValues,
    donutActiveIndex,
    selectActiveDonutIndex
  } = props;
  const tooltipParentRef = useRef(null);
  const pieChartRef = useRef(null);
  const [stickyStatus, setStickyStatus] = useState(Sticky.STATUS_ORIGINAL);
  const renderDonutChart = () => (
    <div className={styles.donutContainer} ref={pieChartRef}>
      <PieChart
        customActiveIndex={donutActiveIndex}
        onHover={(_, index) => selectActiveDonutIndex(index)}
        data={emissionsCardData.data}
        width={200}
        config={emissionsCardData.config}
        customTooltip={
          <CustomTooltip
            reference={tooltipParentRef.current}
            chartReference={pieChartRef.current}
            data={emissionsCardData.data}
            itemName={'Parties'}
          />
        }
        customInnerHoverLabel={CustomInnerHoverLabel}
        theme={{ pieChart: styles.pieChart }}
      />
    </div>
  );

  const TOOLTIP_ID = 'lts-map-tooltip';

  return (
    <div>
      <TabletLandscape>
        {isTablet => (
          <div className={styles.wrapper}>
            <Sticky
              activeClass="sticky -explore"
              top="#navBarMobile"
              onStateChange={sticky => setStickyStatus(sticky.status)}
            >
              <div className={layout.content}>
                <div className="grid-column-item">
                  <div className={styles.filtersLayout}>
                    <div
                      className={cx(styles.filtersGroup, {
                        [styles.sticky]: stickyStatus === Sticky.STATUS_FIXED
                      })}
                    >
                      <Dropdown
                        label="Category"
                        paceholder="Select a category"
                        options={categories}
                        onValueChange={handleCategoryChange}
                        value={selectedCategory}
                        hideResetButton
                        plain
                        showTooltip={
                          selectedCategory && selectedCategory.label.length > 14
                        }
                      />
                      <Dropdown
                        label="Indicator"
                        options={indicators}
                        onValueChange={handleIndicatorChange}
                        value={selectedIndicator}
                        hideResetButton
                        plain
                        showTooltip={
                          selectedIndicator &&
                          selectedIndicator.label.length > 14
                        }
                      />
                    </div>
                    {isTablet &&
                      renderButtonGroup(
                        handleInfoClick,
                        downloadLink,
                        stickyStatus
                      )}
                  </div>
                </div>
              </div>
            </Sticky>
            <div className={styles.containerUpperWrapper}>
              <div className={layout.content}>
                <div className="grid-column-item">
                  <div className={styles.containerUpper}>
                    <div
                      className={styles.containerCharts}
                      ref={tooltipParentRef}
                    >
                      {!loading && (
                        <React.Fragment>
                          {summaryCardData && renderSummary(summaryCardData)}
                          {emissionsCardData &&
                            renderDonutChart(emissionsCardData)}
                          {legendData &&
                            renderLegend(legendData, emissionsCardData)}
                        </React.Fragment>
                      )}
                    </div>
                    <div className={styles.containerMap}>
                      {loading && <Loading light className={styles.loader} />}
                      <HandIconInfo
                        className={styles.mapInfo}
                        text="Click on a country to see an in-depth analysis of its long-term strategy"
                      />
                      <Map
                        paths={paths}
                        tooltipId={TOOLTIP_ID}
                        onCountryClick={handleCountryClick}
                        onCountryEnter={handleCountryEnter}
                        onCountryFocus={handleCountryEnter}
                        zoomEnable
                        customCenter={isTablet ? [20, 20] : [10, 20]}
                        theme={newMapTheme}
                        className={styles.map}
                      />
                      <CheckInput
                        theme={blueCheckboxTheme}
                        label="Visualize individual submissions of EU Members on the map"
                        checked={checked}
                        onChange={() => handleOnChangeChecked(!checked)}
                      />
                      {countryData && (
                        <ExploreMapTooltip
                          id={TOOLTIP_ID}
                          isTablet={isTablet}
                          countryData={countryData}
                          handleCountryClick={handleCountryClick}
                          tooltipValues={tooltipValues}
                        />
                      )}
                      {!isTablet &&
                        renderButtonGroup(handleInfoClick, downloadLink)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ModalMetadata />
          </div>
        )}
      </TabletLandscape>
    </div>
  );
}

LTSExploreMap.propTypes = {
  loading: PropTypes.bool,
  paths: PropTypes.array.isRequired,
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
  tooltipValues: PropTypes.object,
  handleOnChangeChecked: PropTypes.func,
  checked: PropTypes.bool,
  handleIndicatorChange: PropTypes.func,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  donutActiveIndex: PropTypes.number
};

export default LTSExploreMap;
