/* eslint-disable react/no-danger */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import Dropdown from 'components/dropdown';
import ModalMetadata from 'components/modal-metadata';
import { PieChart, MultiLevelDropdown } from 'cw-components';
import CustomTooltip from 'components/ndcs/shared/donut-tooltip';
import ExploreMapTooltip from 'components/ndcs/shared/explore-map-tooltip';
import { getHoverIndex } from 'components/ndcs/shared/utils';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import CustomInnerHoverLabel from 'components/ndcs/shared/donut-custom-label';
import LegendItem from 'components/ndcs/shared/legend-item';
import ShareButton from 'components/button/share-button';
import Sticky from 'react-stickynode';
import cx from 'classnames';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import ModalShare from 'components/modal-share';

import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import layout from 'styles/layout.scss';
import styles from './ndcs-explore-map-styles.scss';

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
          section: 'ndcs-content',
          link: downloadLink
        },
        {
          type: 'addToUser'
        }
      ]}
    />
    <ShareButton />
    <ModalShare analyticsName="NDC Explore" />
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
            number={l.partiesNumber}
            value={l.value}
            color={l.color}
          />
        ))}
    </div>
  </div>
);

function NDCSExploreMap(props) {
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
    tooltipValues,
    selectActiveDonutIndex,
    donutActiveIndex
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
          />
        }
        customInnerHoverLabel={CustomInnerHoverLabel}
        theme={{ pieChart: styles.pieChart }}
      />
    </div>
  );

  const TOOLTIP_ID = 'ndcs-map-tooltip';
  return (
    <div>
      <CountriesDocumentsProvider />
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
                          selectedCategory &&
                          selectedCategory.label &&
                          selectedCategory.label.length > 14
                        }
                      />
                      <MultiLevelDropdown
                        key="indicator"
                        label="Indicator"
                        options={indicators || []}
                        values={selectedIndicator ? [selectedIndicator] : []}
                        disabled={loading}
                        onChange={handleIndicatorChange}
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
                        text="The map reflects latest submission of each country, click on a country to see in-depth analysis of its latest NDC and previous submissions"
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
          </div>
        )}
      </TabletLandscape>
      <ModalMetadata />
    </div>
  );
}

NDCSExploreMap.propTypes = {
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
  handleIndicatorChange: PropTypes.func,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  donutActiveIndex: PropTypes.number
};

export default NDCSExploreMap;
