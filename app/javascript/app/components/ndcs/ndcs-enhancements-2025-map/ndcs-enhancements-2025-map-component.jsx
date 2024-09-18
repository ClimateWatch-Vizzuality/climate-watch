/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import MetadataProvider from 'providers/metadata-provider';
import NdcsProvider from 'providers/ndcs-provider';
import AbbrReplace from 'components/abbr-replace';
import { CheckInput } from 'cw-components';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import ModalPngDownload from 'components/modal-png-download';
import NDCSEnhancementsTooltip from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-tooltip';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import { Link } from 'react-router-dom';
import { INDICATOR_SLUGS } from 'data/constants';
import styles from './ndcs-enhancements-2025-map-styles.scss';

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
            commitments. You can compare countries’ submissions side by side{' '}
            <Link
              to="custom-compare/overview"
              title="Compare submissions"
              target="_blank"
            >
              here
            </Link>{' '}
            or by referring to the table below. To request changes or additions,
            please contact &nbsp;
            <a
              href="mailto:Mengpin.Ge@wri.org?subject=NDC Enhancement Tracker Update"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mengpin Ge
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
    </div>
  </div>
);

const TOOLTIP_ID = 'ndcs-map-tooltip';

const NDCSEnhancements2025Map = ({
  loading,
  indicator,
  paths,
  tooltipValues,
  downloadLink,
  handleInfoClick,
  handleCountryEnter,
  mapColors,
  handleOnChangeChecked,
  handlePngDownloadModal,
  handleCountryClick,
  checked,
  pngDownloadId
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

  const renderMapLegend = isPNG => (
    <MapLegend
      className={cx(styles.legend, { [styles.isPNG]: isPNG })}
      title={indicator.legend}
      buckets={indicator.legendBuckets}
      mapColors={mapColors}
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
                      label="Show which new NDCs reduce total emissions from previous NDC"
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
                {indicator && renderMapLegend()}
              </div>
            </div>
            <ModalPngDownload id={pngDownloadId} title="NDC enhancements">
              {renderMap({ isTablet: true, png: true })}
              <div className={styles.pngLegendAndSummary}>
                {indicator && renderMapLegend(true)}
              </div>
            </ModalPngDownload>
            <ModalMetadata />
            <NDCSPreviousComparisonProvider />
            <CountriesDocumentsProvider />
            <NdcsProvider
              overrideFilter
              indicatorSlugs={[
                INDICATOR_SLUGS.enhancements,
                INDICATOR_SLUGS.emissions,
                'ndce_compare',
                'ndce_statement',
                'ndce_source',
                'ndce_date'
              ]}
            />
            <MetadataProvider source="2020_ndc" />
          </div>
        )}
      </TabletLandscape>
    </div>
  );
};

NDCSEnhancements2025Map.propTypes = {
  loading: PropTypes.bool,
  indicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipValues: PropTypes.object,
  downloadLink: PropTypes.string,
  pngDownloadId: PropTypes.string.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleOnChangeChecked: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  mapColors: PropTypes.array
};

export default NDCSEnhancements2025Map;
