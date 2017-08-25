import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';

import styles from './ndcs-map-styles.scss';

const NDCMap = props =>
  (<div>
    <Map
      paths={props.paths}
      zoomEnable
      onCountryClick={props.handleCountryClick}
    />
    <div className={styles.col4}>
      <Dropdown
        label="Category"
        options={props.categories}
        onChange={props.handleCategoryChange}
        value={props.selectedCategory}
        clearable={false}
      />
      <Dropdown
        label="Indicator"
        options={props.indicators}
        onChange={props.handleIndicatorChange}
        value={props.selectedIndicator}
        clearable={false}
      />
      <ButtonGroup className={styles.buttons} />
    </div>
  </div>);

NDCMap.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  indicators: PropTypes.array.isRequired,
  selectedIndicator: PropTypes.string,
  paths: PropTypes.array.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired
};

export default NDCMap;
