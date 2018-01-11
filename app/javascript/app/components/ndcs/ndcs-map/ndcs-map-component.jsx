import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import ReactTooltip from 'react-tooltip';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';

import styles from './ndcs-map-styles.scss';

const getHtmlTooltip = content => ({ __html: content });

const NDCMap = props => (
  <div className={styles.wrapper}>
    <div className={styles.col4}>
      <Dropdown
        label="Category"
        paceholder="Select a category"
        options={props.categories}
        onValueChange={props.handleCategoryChange}
        value={props.selectedCategory}
        hideResetButton
        plain
      />
      <Dropdown
        label="Indicator"
        options={props.indicators}
        onValueChange={props.handleIndicatorChange}
        value={props.selectedIndicator}
        hideResetButton
        plain
      />
      <ButtonGroup
        className={styles.buttons}
        onInfoClick={props.handleInfoClick}
        shareUrl="/embed/ndcs"
        analyticsGraphName="Ndcs"
      />
    </div>
    {props.loading && <Loading light className={styles.loader} />}
    <Map
      paths={props.paths}
      tooltipId="mapTooltip"
      onCountryClick={props.handleCountryClick}
      onCountryEnter={props.handleCountryEnter}
    />
    <ReactTooltip id="mapTooltip">
      {props.tooltipTxt && (
        <p dangerouslySetInnerHTML={getHtmlTooltip(props.tooltipTxt)} /> // eslint-disable-line
      )}
    </ReactTooltip>
    {props.selectedIndicator && (
      <MapLegend
        className={styles.legend}
        title={props.selectedIndicator.legend}
        buckets={props.selectedIndicator.legendBuckets}
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
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired
};

export default NDCMap;
