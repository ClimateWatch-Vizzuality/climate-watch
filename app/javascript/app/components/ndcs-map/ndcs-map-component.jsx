import React from 'react';
import Proptypes from 'prop-types';
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
        placeholder="Region"
        options={[]}
        onChange={() => console.info('changed')}
        value={''}
        clearable={false}
        isOpen
      />
      <Dropdown
        placeholder="Region"
        options={[]}
        onChange={() => console.info('changed')}
        value={''}
        clearable={false}
      />
      <Dropdown
        placeholder="Region"
        options={[]}
        onChange={() => console.info('changed')}
        value={''}
        clearable={false}
      />
      <ButtonGroup />
    </div>
  </div>);

NDCMap.propTypes = {
  paths: Proptypes.array.isRequired,
  handleCountryClick: Proptypes.func.isRequired
};

export default NDCMap;
