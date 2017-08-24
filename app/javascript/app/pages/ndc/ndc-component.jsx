import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';
import Map from 'components/map';
import Dropdown from 'components/Dropdown';
import ButtonGroup from 'components/button-group';

import layout from 'styles/layout.scss';
import styles from './ndc-styles.scss';

const NDC = props =>
  (<div>
    <Header>
      <Intro title="NDC Explorer" />
      <AutocompleteSearch />
      <AnchorNav links={props.links} />
    </Header>
    <div className={cx(layout.content, styles.wrapper)}>
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
    </div>
  </div>);

NDC.propTypes = {
  paths: Proptypes.array.isRequired,
  links: Proptypes.array.isRequired,
  handleCountryClick: Proptypes.func.isRequired
};

export default NDC;
