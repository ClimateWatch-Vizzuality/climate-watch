/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import cx from 'classnames';

import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import AbbrReplace from 'components/abbr-replace';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import Dropdown from 'components/dropdown';
import ModalMetadata from 'components/modal-metadata';
import ModalPngDownload from 'components/modal-png-download';
import {
  PieChart,
  MultiLevelDropdown,
  CheckInput,
  Switch
} from 'cw-components';
import CustomTooltip from 'components/ndcs/shared/donut-tooltip';
import ExploreMapTooltip from 'components/ndcs/shared/explore-map-tooltip';
import { getHoverIndex } from 'components/ndcs/shared/utils';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import CustomInnerHoverLabel from 'components/ndcs/shared/donut-custom-label';
import LegendItem from 'components/ndcs/shared/legend-item';
import ShareButton from 'components/button/share-button';
import SEOTags from 'components/seo-tags';
import GhgMultiselectDropdown from 'components/ghg-multiselect-dropdown';
import ModalShare from 'components/modal-share';

import NDCSExploreProvider from 'providers/ndcs-explore-provider';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import DocumentsProvider from 'providers/documents-provider';

import { SEO_PAGES } from 'data/seo';

import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import layout from 'styles/layout.scss';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import styles from './ndcs-explore-map-styles.scss';

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

const renderLegend = (legendData, emissionsCardData, isPNG) => (
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
            infoText={
              emissionsCardData &&
              emissionsCardData.tooltip &&
              emissionsCardData.tooltip[l.name]
            }
            name={l.name}
            number={l.partiesNumber}
            value={l.value}
            color={l.color}
            disableAbbr={isPNG}
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
    title: 'Countries'
  }
];

const SWITCH_OPTIONS = ['GHG Emissions', 'Vulnerability'].map(name => ({
  name,
  value: name
}));
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
    locations,
    handleLocationsChange,
    handleDocumentChange,
    handleCategoryChange,
    handleIndicatorChange,
    selectedDocument,
    selectedCategory,
    selectedIndicator,
    selectedLocations,
    tooltipValues,
    selectActiveDonutIndex,
    donutActiveIndex,
    handleOnChangeChecked,
    handlePngDownloadModal,
    pngSelectionSubtitle,
    checked,
    pngDownloadId
  } = props;
  const tooltipParentRef = useRef(null);
  const pieChartRef = useRef(null);
  const [stickyStatus, setStickyStatus] = useState(Sticky.STATUS_ORIGINAL);
  const [selectedOption, setSelectedOption] = useState(SWITCH_OPTIONS[0].value);

  const renderVulnerabilityChart = () => 'Hi there';
  const renderSecondChartsCard = () => (
    <div className={styles.secondCard}>
      <Switch
        options={SWITCH_OPTIONS}
        selectedOption={selectedOption}
        onClick={e => setSelectedOption(e.value)}
        theme={{
          wrapper: styles.switch,
          option: styles.switchOption,
          checkedOption: styles.switchSelected
        }}
      />
      {selectedOption === SWITCH_OPTIONS[0].value
        ? renderDonutChart()
        : renderVulnerabilityChart()}
    </div>
  );

  const renderDonutChart = () => {
    const isRegional =
      selectedLocations &&
      selectedLocations.length &&
      selectedLocations[0].value !== 'WORLD';
    return (
      <div ref={pieChartRef}>
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
                        [styles.sticky]: stickyStatus === Sticky.STATUS_FIXED
                      })}
                      data-tour="ndc-explore-02"
                    >
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
                        noAutoSort
                      />
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
                    data-tour="ndc-explore-03"
                  >
                    <div
                      className={styles.containerCharts}
                      ref={tooltipParentRef}
                    >
                      {!loading && (
                        <React.Fragment>
                          {summaryCardData && renderSummary(summaryCardData)}
                          {emissionsCardData && renderSecondChartsCard()}
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
        id={pngDownloadId}
        title="NDC Explorer"
        selectionSubtitle={pngSelectionSubtitle}
      >
        {renderMap({ isTablet: true, png: true })}
        {legendData && renderLegend(legendData, emissionsCardData, true)}
      </ModalPngDownload>
      <DocumentsProvider />
      <React.Fragment>
        <NDCSExploreProvider
          document={selectedDocument && selectedDocument.value}
          subcategory={selectedCategory && selectedCategory.value}
        />
        <NDCSPreviousComparisonProvider
          document={selectedDocument && selectedDocument.value}
        />
      </React.Fragment>
    </div>
  );
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
  documents: PropTypes.array,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  locations: PropTypes.array,
  selectedDocument: PropTypes.object,
  selectedCategory: PropTypes.object,
  selectedIndicator: PropTypes.object,
  selectedLocations: PropTypes.array,
  handleDocumentChange: PropTypes.func,
  handleLocationsChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  handleIndicatorChange: PropTypes.func,
  tooltipValues: PropTypes.object,
  selectActiveDonutIndex: PropTypes.func.isRequired,
  handleOnChangeChecked: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string,
  pngDownloadId: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  donutActiveIndex: PropTypes.number
};

export default NDCSExploreMap;
