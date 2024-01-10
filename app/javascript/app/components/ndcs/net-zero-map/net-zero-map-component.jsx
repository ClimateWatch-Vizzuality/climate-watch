/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import ModalPngDownload from 'components/modal-png-download';
import Dropdown from 'components/dropdown';
import { PieChart, CheckInput } from 'cw-components';
import AbbrReplace from 'components/abbr-replace';
import CustomTooltip from 'components/ndcs/shared/donut-tooltip';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import CustomInnerHoverLabel from 'components/ndcs/shared/donut-custom-label';
import LegendItem from 'components/ndcs/shared/legend-item';
import ShareButton from 'components/button/share-button';
import ExploreMapTooltip from 'components/ndcs/shared/explore-map-tooltip';
import GhgMultiselectDropdown from 'components/ghg-multiselect-dropdown';
import ModalShare from 'components/modal-share';
import Sticky from 'react-stickynode';
import cx from 'classnames';
import { getHoverIndex } from 'components/ndcs/shared/utils';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';

import layout from 'styles/layout.scss';
import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import styles from './net-zero-map-styles.scss';

const renderButtonGroup = (
  clickHandler,
  downloadLink,
  handlePngDownloadModal,
  stickyStatus
) => (
  <div
    className={cx(styles.buttonGroupContainer, {
      [styles.padded]: stickyStatus !== Sticky.STATUS_ORIGINAL
    })}
  >
    <span data-tour="net-zero-05">
      <ButtonGroup
        className={styles.buttonGroup}
        buttonsConfig={[
          {
            type: 'info',
            onClick: clickHandler
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
          },
          {
            type: 'addToUser'
          }
        ]}
      />
      <ShareButton className={styles.shareButton} />
    </span>
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
        <AbbrReplace>{summaryData.description}</AbbrReplace>
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

const LOCATION_GROUPS = [
  {
    groupId: 'regions',
    title: 'Regions'
  },
  {
    groupId: 'countries',
    title: 'Parties'
  }
];

function NetZeroMap(props) {
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
    locations,
    handleLocationsChange,
    selectedLocations,
    selectedIndicator,
    handleCategoryChange,
    selectedCategory,
    handleIndicatorChange,
    handleOnChangeChecked,
    handlePngDownloadModal,
    pngSelectionSubtitle,
    checked,
    tooltipValues,
    donutActiveIndex,
    selectActiveDonutIndex,
    pngDownloadId
  } = props;
  useEffect(() => {
    selectActiveDonutIndex(0);
  }, [selectActiveDonutIndex]);
  const tooltipParentRef = useRef(null);
  const pieChartRef = useRef(null);
  const [stickyStatus, setStickyStatus] = useState(Sticky.STATUS_ORIGINAL);
  const renderDonutChart = () => {
    const isRegional =
      selectedLocations &&
      selectedLocations.length &&
      selectedLocations[0].value !== 'WORLD';
    return (
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
              isRegional={isRegional}
            />
          }
          customInnerHoverLabel={p => (
            <CustomInnerHoverLabel {...p} isRegional={isRegional} />
          )}
          theme={{ pieChart: styles.pieChart }}
        />
      </div>
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderMap = ({ isTablet, png }) => {
    const customCenter = isTablet ? [22, 20] : [10, 20];
    return (
      <Map
        paths={paths}
        tooltipId={TOOLTIP_ID}
        onCountryClick={handleCountryClick}
        onCountryEnter={handleCountryEnter}
        onCountryFocus={handleCountryEnter}
        zoomEnable={!png}
        customCenter={customCenter}
        theme={newMapTheme}
        className={styles.map}
      />
    );
  };

  const TOOLTIP_ID = 'net-zero-map-tooltip';

  return (
    <div>
      <SEOTags
        dynamicTitlePart={selectedIndicator && selectedIndicator.label}
        page={SEO_PAGES.netZero}
        href={location.href}
      />
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
                      data-tour="net-zero-01"
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
                      <GhgMultiselectDropdown
                        label={'Location'}
                        groups={LOCATION_GROUPS}
                        options={locations || []}
                        values={selectedLocations || []}
                        onSelectionChange={handleLocationsChange}
                      />
                    </div>
                    {isTablet &&
                      renderButtonGroup(
                        handleInfoClick,
                        downloadLink,
                        handlePngDownloadModal,
                        stickyStatus
                      )}
                  </div>
                </div>
              </div>
            </Sticky>
            <div className={styles.containerUpperWrapper}>
              <div className={layout.content}>
                <div className="grid-column-item">
                  <div
                    className={styles.containerUpper}
                    data-tour="net-zero-02"
                  >
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
                    <div
                      className={styles.containerMap}
                      data-tour="net-zero-03"
                    >
                      {loading && <Loading light className={styles.loader} />}
                      <HandIconInfo className={styles.mapInfo}>
                        The map reflects latest communication of each country.
                        Explore which countries have adopted a net-zero target
                        below and click on a country to see its climate profile.
                      </HandIconInfo>
                      {renderMap({ isTablet })}
                      <CheckInput
                        theme={blueCheckboxTheme}
                        label="Visualize individual targets of EU Members on the map"
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
                        renderButtonGroup(
                          handleInfoClick,
                          downloadLink,
                          handlePngDownloadModal
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ModalMetadata />
            <ModalPngDownload
              id={pngDownloadId}
              title="Net Zero"
              selectionSubtitle={pngSelectionSubtitle}
            >
              {renderMap({ isTablet: true, png: true })}
              {legendData && renderLegend(legendData, emissionsCardData)}
            </ModalPngDownload>
          </div>
        )}
      </TabletLandscape>
    </div>
  );
}

NetZeroMap.propTypes = {
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
  locations: PropTypes.array,
  selectedLocations: PropTypes.array,
  handleLocationsChange: PropTypes.func,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  selectedIndicator: PropTypes.object,
  handleCategoryChange: PropTypes.func,
  selectedCategory: PropTypes.object,
  tooltipValues: PropTypes.object,
  handleOnChangeChecked: PropTypes.func,
  checked: PropTypes.bool,
  handleIndicatorChange: PropTypes.func,
  handlePngDownloadModal: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string,
  pngDownloadId: PropTypes.string.isRequired,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  donutActiveIndex: PropTypes.number
};

export default NetZeroMap;
