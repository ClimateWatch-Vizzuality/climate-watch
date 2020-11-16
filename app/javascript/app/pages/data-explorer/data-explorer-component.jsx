import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import DownloadMenu from 'components/download-menu';
import anchorNavThemeColorTheme from 'styles/themes/anchor-nav/anchor-nav-theme-color.scss';
import layout from 'styles/layout.scss';
import { SEO_PAGES } from 'data/SEO';
import SEOTags from 'components/seo-tags';
import styles from './data-explorer-styles';

const DataExplorer = ({ navLinks, route, location }) => (
  <div>
    <SEOTags page={SEO_PAGES.dataExplorer} href={location.href} />
    <Header theme={styles}>
      <div className={styles.introWrapper}>
        <Intro
          theme={styles}
          className={styles.intro}
          title="Data Explorer"
          description={
            'Here you can find all the raw data that is used in the other modules across the site. Filter the data using the picklists at the top and download data for that module or the whole site for your own analysis.'
          }
          customButton={
            <DownloadMenu
              title="Download bulk data"
              inButton
              withDownloadIcon
            />
          }
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
  location: PropTypes.object
};

export default DataExplorer;
