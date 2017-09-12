import React from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';

import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

const NDC = props => (
  <div>
    <Header size="medium" image={background}>
      <div className={layout.content}>
        <div className={styles.cols}>
          <Intro title="NDC Content" />
          <AutocompleteSearch />
        </div>
        <AnchorNav useRoutes links={props.anchorLinks} />
      </div>
    </Header>
    <div className={cx(layout.content, styles.wrapper)}>
      {renderRoutes(props.route.routes)}
    </div>
  </div>
);

NDC.propTypes = {
  route: Proptypes.object.isRequired,
  anchorLinks: Proptypes.array.isRequired
};

export default NDC;
