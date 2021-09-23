/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import { CheckInput } from 'cw-components';
import Loading from 'components/loading';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import ModalMetadata from 'components/modal-metadata';
import ModalPngDownload from 'components/modal-png-download';
import NDCSEnhancementsTooltip from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-tooltip';
import ReactTooltip from 'react-tooltip';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import { Link } from 'react-router-dom';
import { ENHANCEMENT_LABEL_SLUGS } from 'data/constants';
import styles from './ndcs-enhancements-map-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const renderButtonGroup = (
  clickHandler,
  downloadLink,
  handlePngDownloadModal
) => (
  <div className={styles.containerControls}>
    <div>
      <p>
        <em>
          <AbbrReplace>
            Track which countries are submitting their national climate
            commitments in the lead up to COP26. You can compare countries’
            submissions side by side{' '}
            <Link to="custom-compare/overview" title="Compare submissions">
              here
            </Link>{' '}
            or by referring to the table below. To request changes or additions,
            please contact &nbsp;
            <a
              href="mailto:Rhys.Gerholdt@wri.org?subject=NDC Enhancement Tracker Update"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rhys Gerholdt
            </a>
            .
          </AbbrReplace>
        </em>
      </p>
    </div>
    <div>
      <ButtonGroup
        className={styles.buttonGroup}
        dataTour="ndc-enhancement-tracker-04"
        buttonsConfig={[
          {
            type: 'info',
            onClick: clickHandler
          },
          {
            type: 'share',
            shareUrl: '/embed/2020-ndc-tracker',
            analyticsGraphName: 'Ndcs',
            positionRight: true
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
    </div>
  </div>
);

const renderSummaryItem = datum => (
  <div className={styles.summaryItemContainer}>
    <div className={styles.summaryItemValuesContainer}>
      <div className={styles.summaryItemValues}>
        <div
          style={{
            color: datum.opts.color
          }}
        >
          {datum.opts.prefix}
          {datum.value}
        </div>
      </div>
    </div>
    <div className={styles.summaryItemLabels}>
      <div
        dangerouslySetInnerHTML={{
          __html: replaceStringAbbr(datum.opts.label)
        }}
      />
    </div>
  </div>
);

const TOOLTIP_ID = 'ndcs-map-tooltip';

const NDCSEnhancementsMap = ({
  loading,
  indicator,
  paths,
  tooltipValues,
  downloadLink,
  summaryData,
  handleInfoClick,
  handleCountryEnter,
  mapColors,
  handleOnChangeChecked,
  handlePngDownloadModal,
  handleCountryClick,
  checked
}) => {
  // eslint-disable-next-line react/prop-types
  const renderMap = ({ isTablet, png }) => (
    <Map
      paths={paths}
      tooltipId={TOOLTIP_ID}
      onCountryEnter={handleCountryEnter}
      onCountryFocus={handleCountryEnter}
      onCountryClick={handleCountryClick}
      zoomEnable={!png}
      customCenter={!isTablet ? [10, -10] : null}
      className={styles.map}
    />
  );

  return (
    <div className={styles.ndcTracker}>
      <TabletLandscape>
        {isTablet => (
          <div className={styles.wrapper}>
            <div className={styles.filtersLayout}>
              {isTablet &&
                renderButtonGroup(
                  handleInfoClick,
                  downloadLink,
                  handlePngDownloadModal
                )}
            </div>

            <div className={styles.containerUpper}>
              <div className={styles.containerCharts}>
                {!loading && summaryData && (
                  <div className={styles.summary}>
                    <div
                      data-tip
                      data-for="covid-update-tooltip"
                      className={styles.summaryTitle}
                    >
                      COVID-19 Update
                      <Icon icon={infoIcon} className={styles.infoIcon} />
                    </div>
                    <ReactTooltip
                      id="covid-update-tooltip"
                      className={styles.covidTooltip}
                    >
                      Some nations have signaled that the impacts of the
                      coronavirus pandemic may delay their submission of updated
                      or enhanced NDCs. While many will submit in 2020 as
                      scheduled, some have indicated they may do so in 2021
                      ahead of COP26. The information below does not reflect
                      these possible delays.
                    </ReactTooltip>
                    <div className={styles.summaryItemsContainer}>
                      {renderSummaryItem(
                        summaryData[ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2020]
                          .countries
                      )}
                      {renderSummaryItem(
                        summaryData[ENHANCEMENT_LABEL_SLUGS.ENHANCED_MITIGATION]
                          .countries
                      )}
                      <span className={styles.separator} />
                      {renderSummaryItem(
                        summaryData[ENHANCEMENT_LABEL_SLUGS.INTENDS_TO_ENHANCE]
                          .countries
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.containerMap}>
                {loading && <Loading light className={styles.loader} />}
                {!isTablet &&
                  renderButtonGroup(
                    handleInfoClick,
                    downloadLink,
                    handlePngDownloadModal
                  )}
                <span data-tour="ndc-enhancement-tracker-02">
                  {renderMap({ isTablet })}
                </span>
                {!loading && (
                  <div className={styles.checkboxContainer}>
                    <CheckInput
                      theme={blueCheckboxTheme}
                      label="Show which new NDCs reduce total emissions"
                      checked={checked}
                      onChange={() => handleOnChangeChecked(!checked)}
                    />
                  </div>
                )}
                {!loading && tooltipValues && (
                  <NDCSEnhancementsTooltip
                    id={TOOLTIP_ID}
                    tooltipValues={tooltipValues}
                  />
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
            <ModalPngDownload title="NDC enhancements">
              {renderMap({ isTablet: true, png: true })}
              {indicator && (
                <MapLegend
                  className={styles.legend}
                  title={indicator.legend}
                  buckets={indicator.legendBuckets}
                  mapColors={mapColors}
                />
              )}
            </ModalPngDownload>
            <ModalMetadata />
            {FEATURE_ENHANCEMENT_CHANGES && (
              <React.Fragment>
                <NDCSPreviousComparisonProvider />
                <CountriesDocumentsProvider />
              </React.Fragment>
            )}
          </div>
        )}
      </TabletLandscape>
    </div>
  );
};

NDCSEnhancementsMap.propTypes = {
  loading: PropTypes.bool,
  indicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipValues: PropTypes.object,
  downloadLink: PropTypes.string,
  summaryData: PropTypes.object,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleOnChangeChecked: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  mapColors: PropTypes.array
};

export default NDCSEnhancementsMap;