import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import anchorNavThemeColorTheme from 'styles/themes/anchor-nav/anchor-nav-theme-color.scss';
import layout from 'styles/layout.scss';
import styles from './data-explorer-styles';

const DataExplorer = ({ navLinks, route, handleDownloadModalOpen }) => (
  <div>
    <Header theme={styles}>
      <div className={styles.introWrapper}>
        <Intro
          theme={styles}
          className={styles.intro}
          title="Data Explorer"
          button={{
            text: 'Download All Data (62 MB)',
            onClick: handleDownloadModalOpen,
            color: 'white',
            className: styles.button
          }}
        />
      </div>
      <AnchorNav
        useRoutes
        links={navLinks}
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
  navLinks: PropTypes.array,
  route: PropTypes.object.isRequired,
  handleDownloadModalOpen: PropTypes.func.isRequired
};

export default DataExplorer;
