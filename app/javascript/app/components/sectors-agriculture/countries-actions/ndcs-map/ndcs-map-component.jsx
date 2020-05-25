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

const renderButtonGroup = (clickHandler, downloadLink) => (
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
  handleCountryEnter
}) => (
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
              {renderButtonGroup(handleInfoClick, downloadLink)}
              <ShareButton sharePath="/agriculture-emission/countries-actions" />
            </Fragment>
          )}
        </div>
        {loading && <Loading light className={styles.loader} />}
        <Map
          paths={paths}
          tooltipId="ndcs-map-tooltip"
          onCountryClick={handleCountryClick}
          onCountryEnter={handleCountryEnter}
          onCountryFocus={handleCountryEnter}
          dragEnable={false}
          customCenter={!isTablet ? [10, -50] : null}
        />
        {!isTablet && (
          <div className={styles.buttonsContainer}>
            {renderButtonGroup(handleInfoClick, true)}
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
        {selectedIndicator && (
          <MapLegend
            className={styles.legend}
            mapColors={mapColors}
            title={selectedIndicator.legend}
            buckets={selectedIndicator.legendBuckets}
          />
        )}
        <DataExplorerFilters section={'ndc-content'} />
      </div>
    )}
  </TabletLandscape>
);

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
  mapColors: PropTypes.array
};

export default NDCMap;
