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

const NDC = ({ anchorLinks, query, route }) => (
  <div>
    <Header size="medium" route={route}>
      <div className={layout.content}>
        <div className={styles.cols}>
          <Intro title="NDC Content" />
          <AutocompleteSearch />
        </div>
        <AnchorNav useRoutes links={anchorLinks} query={query} />
      </div>
    </Header>
    <div className={cx(layout.content, styles.wrapper)}>
      {renderRoutes(route.routes)}
    </div>
  </div>
);

NDC.propTypes = {
  query: Proptypes.string,
  route: Proptypes.object.isRequired,
  anchorLinks: Proptypes.array.isRequired
};

export default NDC;
