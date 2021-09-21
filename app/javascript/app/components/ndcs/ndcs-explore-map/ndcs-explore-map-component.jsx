/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import AbbrReplace from 'components/abbr-replace';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import Dropdown from 'components/dropdown';
import ModalMetadata from 'components/modal-metadata';
import ModalPngDownload from 'components/modal-png-download';
import { PieChart, MultiLevelDropdown, CheckInput } from 'cw-components';
import CustomTooltip from 'components/ndcs/shared/donut-tooltip';
import ExploreMapTooltip from 'components/ndcs/shared/explore-map-tooltip';
import { getHoverIndex } from 'components/ndcs/shared/utils';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import CustomInnerHoverLabel from 'components/ndcs/shared/donut-custom-label';
import LegendItem from 'components/ndcs/shared/legend-item';
import ShareButton from 'components/button/share-button';
import Sticky from 'react-stickynode';
import cx from 'classnames';
import ModalShare from 'components/modal-share';
import NDCSProvider from 'providers/ndcs-provider';
import NDCSExploreProvider from 'providers/ndcs-explore-provider';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import DocumentsProvider from 'providers/documents-provider';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';

import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import layout from 'styles/layout.scss';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import styles from './ndcs-explore-map-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const renderButtonGroup = (
  clickHandler,
  downloadLink,
  handlePngDownloadModal,
  stickyStatus = false
) => (
  <div
    className={cx(styles.buttonGroupContainer, {
      [styles.padded]: stickyStatus !== Sticky.STATUS_ORIGINAL
    })}
  >
    <span data-tour="ndc-explore-06">
      <ButtonGroup
        className={styles.buttonGroup}
        buttonsConfig={[
          {
            type: 'info',
            onClick: clickHandler
          },
          FEATURE_ENHANCEMENT_CHANGES
            ? {
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
            }
            : {
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
    </span>
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
            <AbbrReplace>{summarySentence.description}</AbbrReplace>
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
    documents,
    categories,
    indicators,
    handleDocumentChange,
    handleCategoryChange,
    handleIndicatorChange,
    selectedDocument,
    selectedCategory,
    selectedIndicator,
    tooltipValues,
    selectActiveDonutIndex,
    donutActiveIndex,
    handleOnChangeChecked,
    handlePngDownloadModal,
    pngSelectionSubtitle,
    checked
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

  const TOOLTIP_ID = 'ndcs-map-tooltip';
  return (
    <div>
      <SEOTags
        dynamicTitlePart={selectedIndicator && selectedIndicator.label}
        page={SEO_PAGES.ndcsExplore}
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
                        [styles.sticky]: stickyStatus === Sticky.STATUS_FIXED,
                        [styles.withDocumentDropdown]: FEATURE_ENHANCEMENT_CHANGES
                      })}
                      data-tour="ndc-explore-02"
                    >
                      {FEATURE_ENHANCEMENT_CHANGES && (
                        <Dropdown
                          label="Document"
                          placeholder="Select a Document"
                          options={documents}
                          onValueChange={handleDocumentChange}
                          value={selectedDocument}
                          hideResetButton
                          plain
                          showTooltip={
                            selectedDocument &&
                            selectedDocument.label &&
                            selectedDocument.label.length > 14
                          }
                        />
                      )}
                      <Dropdown
                        label="Category"
                        placeholder="Select a category"
                        options={categories}
                        onValueChange={handleCategoryChange}
                        value={selectedCategory}
                        hideResetButton
                        plain
                        disabled={loading}
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
                    data-tour="ndc-explore-03"
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
                    <div className={styles.containerMap}>
                      {loading && <Loading light className={styles.loader} />}
                      <HandIconInfo
                        className={styles.mapInfo}
                        text="The map reflects latest submission of each country, click on a country to see in-depth analysis of its latest NDC and previous submissions"
                      />
                      <span data-tour="ndc-explore-04">
                        {renderMap({ isTablet })}
                      </span>
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
          </div>
        )}
      </TabletLandscape>
      <ModalMetadata />
      <ModalPngDownload
        title="NDC Explorer"
        selectionSubtitle={pngSelectionSubtitle}
      >
        {renderMap({ isTablet: true, png: true })}
        {legendData && renderLegend(legendData, emissionsCardData)}
      </ModalPngDownload>
      <DocumentsProvider />
      {FEATURE_ENHANCEMENT_CHANGES ? (
        <React.Fragment>
          <NDCSExploreProvider
            document={selectedDocument && selectedDocument.value}
            subcategory={selectedCategory && selectedCategory.value}
          />
          <NDCSPreviousComparisonProvider />
        </React.Fragment>
      ) : (
        <NDCSProvider
          subcategory={selectedCategory && selectedCategory.value}
          additionalIndicatorSlugs={[
            'ndce_ghg',
            'submission',
            'submission_date'
          ]}
        />
      )}
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
  documents: PropTypes.array,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  selectedDocument: PropTypes.object,
  selectedCategory: PropTypes.object,
  selectedIndicator: PropTypes.object,
  handleDocumentChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  handleIndicatorChange: PropTypes.func,
  tooltipValues: PropTypes.object,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  handleOnChangeChecked: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string,
  checked: PropTypes.bool,
  donutActiveIndex: PropTypes.number
};

export default NDCSExploreMap;
