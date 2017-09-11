import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import ReactTooltip from 'react-tooltip';

import styles from './ndcs-map-styles.scss';

const getHtmlTooltip = content => ({ __html: content });

const NDCMap = props => (
  <div className={styles.wrapper}>
    <Map
      cache={false}
      paths={props.paths}
      tooltipId="mapTooltip"
      computedStyles={props.computedStyles}
      onCountryClick={props.handleCountryClick}
      onCountryEnter={props.handleCountryEnter}
    />
    <ReactTooltip id="mapTooltip">
      {props.tooltipTxt && (
        <p dangerouslySetInnerHTML={getHtmlTooltip(props.tooltipTxt)} />
      )}
    </ReactTooltip>
    {props.selectedIndicator && (
      <MapLegend
        className={styles.legend}
        title={props.selectedIndicator.legend}
        buckets={props.selectedIndicator.legendBuckets}
      />
    )}
    <div className={styles.col4}>
      <Dropdown
        openUp
        label="Category"
        options={props.categories}
        onChange={props.handleCategoryChange}
        value={props.selectedCategory.value}
        clearable={false}
      />
      <Dropdown
        openUp
        label="Indicator"
        options={props.indicators}
        onChange={props.handleIndicatorChange}
        value={props.selectedIndicator.value}
        clearable={false}
      />
      <ButtonGroup className={styles.buttons} />
    </div>
  </div>
);

NDCMap.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  computedStyles: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired
};

export default NDCMap;
