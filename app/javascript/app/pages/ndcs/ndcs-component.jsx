import React from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';

import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

const NDC = props =>
  (<div>
    <Header size="medium">
      <div className={styles.cols}>
        <Intro title="NDC Explorer" />
        <AutocompleteSearch />
      </div>
      <AnchorNav links={props.links} />
    </Header>
    <div className={cx(layout.content, styles.wrapper)}>
      {renderRoutes(props.route.routes)}
    </div>
  </div>);

NDC.propTypes = {
  route: Proptypes.object.isRequired,
  links: Proptypes.array.isRequired
};

export default NDC;
