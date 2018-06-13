import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import anchorNavThemeColorTheme from 'styles/themes/anchor-nav/anchor-nav-theme-color.scss';
import layout from 'styles/layout.scss';
import styles from './data-explorer-styles';

const DataExplorer = ({ route }) => (
  <div>
    <Header theme={styles}>
      <Intro theme={styles} className={styles.intro} title="Data Explorer" />
      <AnchorNav
        useRoutes
        links={route.routes.filter(r => r.anchor)}
        theme={anchorNavThemeColorTheme}
        className={styles.anchorNav}
      />
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderRoutes(route.routes)}</div>
    </div>
  </div>
);

DataExplorer.propTypes = {
  route: PropTypes.object.isRequired
};

export default DataExplorer;
