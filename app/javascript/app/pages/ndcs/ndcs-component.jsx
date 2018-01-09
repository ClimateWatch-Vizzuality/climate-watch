import React from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import { Helmet } from 'react-helmet';

import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

const NDC = ({ anchorLinks, query, route }) => (
  <div>
    <Helmet>
      <title>Climate Watch: Data for Climate Action - NDC CONTENT</title>
      <meta
        name="description"
        content={`Explore the commitments (NDCs) made by countries across the world to act on climate change,
          as part of the Paris Agreement`}
      />
    </Helmet>
    <Header size="medium" route={route}>
      <div className={layout.content}>
        <div className={styles.cols}>
          <Intro title="NDC Content" />
          <AutocompleteSearch />
        </div>
        <AnchorNav
          useRoutes
          links={anchorLinks}
          query={query}
          theme={anchorNavRegularTheme}
        />
      </div>
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderRoutes(route.routes)}</div>
    </div>
  </div>
);

NDC.propTypes = {
  query: Proptypes.string,
  route: Proptypes.object.isRequired,
  anchorLinks: Proptypes.array.isRequired
};

export default NDC;
