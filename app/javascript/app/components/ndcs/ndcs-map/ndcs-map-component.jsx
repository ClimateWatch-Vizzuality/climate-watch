import React from 'react';
import PropTypes from 'prop-types';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import ReactTooltip from 'react-tooltip';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './ndcs-map-styles.scss';

const getTooltip = (country, tooltipTxt) => (
  <div className={tooltipTheme.container}>
    <div className={tooltipTheme.info}>
      <div className={tooltipTheme.countryName}>{country}</div>
      <p className={tooltipTheme.text}>{tooltipTxt}</p>
    </div>
  </div>
);

const renderButtonGroup = (clickHandler, reverseDropdown = false) => (
  <ButtonGroup
    className={styles.buttonGroup}
    onInfoClick={clickHandler}
    shareUrl="/embed/ndcs"
    analyticsGraphName="Ndcs"
    reverseDropdown={reverseDropdown}
  />
);

const NDCMap = ({
  categories,
  selectedCategory,
  indicators,
  selectedIndicator,
  loading,
  paths,
  tooltipTxt,
  countryName,
  handleIndicatorChange,
  handleCategoryChange,
  handleInfoClick,
  handleCountryClick,
  handleCountryEnter
}) => (
  <div className={styles.wrapper}>
    <div className={styles.filtersLayout}>
      <Dropdown
        label="Category"
        paceholder="Select a category"
        options={categories}
        onValueChange={handleCategoryChange}
        value={selectedCategory}
        hideResetButton
        plain
      />
      <Dropdown
        label="Indicator"
        options={indicators}
        onValueChange={handleIndicatorChange}
        value={selectedIndicator}
        hideResetButton
        plain
      />
      <TabletLandscape>{renderButtonGroup(handleInfoClick)}</TabletLandscape>
    </div>
    {loading && <Loading light className={styles.loader} />}
    <TabletPortraitOnly>
      {matches => (
        <Map
          paths={paths}
          tooltipId="mapTooltip"
          onCountryClick={handleCountryClick}
          onCountryEnter={handleCountryEnter}
          dragEnable={false}
          customCenter={matches ? [10, -50] : null}
        />
      )}
    </TabletPortraitOnly>
    <TabletPortraitOnly className={styles.column}>
      <div>{renderButtonGroup(handleInfoClick, true)}</div>
    </TabletPortraitOnly>
    <ReactTooltip id="mapTooltip">
      {tooltipTxt && getTooltip(countryName, tooltipTxt)}
    </ReactTooltip>
    {selectedIndicator && (
      <MapLegend
        className={styles.legend}
        title={selectedIndicator.legend}
        buckets={selectedIndicator.legendBuckets}
      />
    )}
    <ModalMetadata />
  </div>
);

NDCMap.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  countryName: PropTypes.string,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired
};

export default NDCMap;
