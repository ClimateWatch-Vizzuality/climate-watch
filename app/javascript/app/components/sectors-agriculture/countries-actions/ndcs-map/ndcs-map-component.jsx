import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import ShareButton from 'components/button/share-button';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import Loading from 'components/loading';
import DataExplorerFilters from 'providers/data-explorer-provider';
import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import NDCSProvider from 'providers/ndcs-provider';
import ModalPngDownload from 'components/modal-png-download';
import styles from './ndcs-map-styles.scss';

const getTooltip = (country, tooltipTxt) => (
  <Link className={tooltipTheme.container} to={`/ndcs/country/${country.id}`}>
    <div className={tooltipTheme.info}>
      <div className={tooltipTheme.countryName}>{country.name}</div>
      <p className={tooltipTheme.text}>{tooltipTxt}</p>
    </div>
    <Icon icon={accordionArrow} className={tooltipTheme.icon} />
  </Link>
);

const renderButtonGroup = (
  clickHandler,
  downloadLink,
  handlePngDownloadModal
) => (
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
);

const NDCMap = ({
  categories,
  selectedCategory,
  selectedIndicator,
  loading,
  paths,
  tooltipTxt,
  downloadLink,
  mapColors,
  countryData,
  handleCategoryChange,
  handleInfoClick,
  handleCountryClick,
  handleCountryEnter,
  handlePngDownloadModal,
  pngSelectionSubtitle
}) => {
  const renderLegend = ({ png = false }) =>
    selectedIndicator && (
      <MapLegend
        className={!png && styles.legend}
        mapColors={mapColors}
        title={selectedIndicator.legend}
        buckets={selectedIndicator.legendBuckets}
      />
    );

  // eslint-disable-next-line react/prop-types
  const renderMap = ({ isTablet, png }) => (
    <Map
      paths={paths}
      tooltipId="ndcs-map-tooltip"
      onCountryClick={handleCountryClick}
      onCountryEnter={handleCountryEnter}
      onCountryFocus={handleCountryEnter}
      customCenter={!isTablet ? [10, -50] : null}
      dragEnable={!png}
      zoomEnable={!png}
    />
  );

  return (
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
            </div>
            {isTablet && (
              <Fragment>
                {renderButtonGroup(
                  handleInfoClick,
                  downloadLink,
                  handlePngDownloadModal
                )}
                <ShareButton sharePath="/agriculture-emission/countries-actions" />
              </Fragment>
            )}
          </div>
          {loading && <Loading light className={styles.loader} />}
          {renderMap({ isTablet })}
          {!isTablet && (
            <div className={styles.buttonsContainer}>
              {renderButtonGroup(handleInfoClick, true, handlePngDownloadModal)}
              <ShareButton sharePath="/agriculture-emission/countries-actions" />
            </div>
          )}
          {countryData && (
            <ReactTooltip
              className={styles.tooltipContainer}
              id="ndcs-map-tooltip"
              delayHide={isTablet ? 0 : 3000}
            >
              {getTooltip(countryData, tooltipTxt)}
            </ReactTooltip>
          )}
          {renderLegend({ png: false })}
          <DataExplorerFilters section={'ndc-content'} />
          <NDCSProvider />
          <ModalPngDownload
            id="countries-actions"
            title="Countries actions in their NDCs"
            selectionSubtitle={pngSelectionSubtitle}
          >
            {renderMap({ isTablet: true, png: true })}
            {renderLegend({ png: true })}
          </ModalPngDownload>
        </div>
      )}
    </TabletLandscape>
  );
};

NDCMap.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.array,
  selectedCategory: PropTypes.object,
  selectedIndicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  downloadLink: PropTypes.string,
  countryData: PropTypes.object,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string,
  mapColors: PropTypes.array
};

export default NDCMap;
