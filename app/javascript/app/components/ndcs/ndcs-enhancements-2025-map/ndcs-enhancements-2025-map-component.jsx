/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import MetadataProvider from 'providers/metadata-provider';
import NdcsProvider from 'providers/ndcs-provider';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';
import ModalPngDownload from 'components/modal-png-download';
import NDCSEnhancementsTooltip from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-tooltip';
import { INDICATOR_SLUGS } from 'data/constants';
import styles from './ndcs-enhancements-2025-map-styles.scss';

const TOOLTIP_ID = 'ndcs-2025-map-tooltip';

const NDCSEnhancements2025Map = ({
  loading,
  indicator,
  paths,
  tooltipValues,
  handleCountryEnter,
  mapColors,
  handleCountryClick,
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
            <div className={styles.containerUpper}>
              <div className={styles.containerMap}>
                {loading && <Loading light className={styles.loader} />}
                <span data-tour="ndc-enhancement-tracker-02">
                  {renderMap({ isTablet })}
                </span>
                {!loading && tooltipValues && (
                  <NDCSEnhancementsTooltip
                    id={TOOLTIP_ID}
                    tooltipValues={tooltipValues}
                    is2025
                  />
                )}
                {indicator && renderMapLegend()}
              </div>
            </div>
            <ModalPngDownload id={pngDownloadId} title="2025 NDC Submission">
              {renderMap({ isTablet: true, png: true })}
              <div className={styles.pngLegendAndSummary}>
                {indicator && renderMapLegend(true)}
              </div>
            </ModalPngDownload>
            <ModalMetadata />
            <CountriesDocumentsProvider />
            <NdcsProvider
              overrideFilter
              indicatorSlugs={[
                INDICATOR_SLUGS.submitted2025,
                INDICATOR_SLUGS.emissions,
                '2025_compare_1',
                '2025_compare_2',
                '2025_compare_3',
                '2025_compare_4',
                '2025_compare_5',
                '2025_statement',
                '2025_source',
                '2025_date',
                // Needed for chart data date sorting
                'ndce_date'
              ]}
            />
            <MetadataProvider source="2025_status" />
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
  pngDownloadId: PropTypes.string.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
  mapColors: PropTypes.array
};

export default NDCSEnhancements2025Map;
