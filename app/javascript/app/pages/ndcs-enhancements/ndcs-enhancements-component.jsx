import React from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import { NDC_ENHANCEMENTS_CONTENT } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './ndcs-enhancements-styles.scss';

const NDCEnhancements = ({ anchorLinks, query, route }) => (
  <div>
    <MetaDescription descriptionContext={NDC_ENHANCEMENTS_CONTENT} subtitle="NDC ENHANCEMENTS CONTENT" />
    <SocialMetadata descriptionContext={NDC_ENHANCEMENTS_CONTENT} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro title="#StepUpAmbition Tracker" />
            <AutocompleteSearch />
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderRoutes(route.routes)}</div>
    </div>
  </div>
);

NDCEnhancements.propTypes = {
  query: Proptypes.string,
  route: Proptypes.object.isRequired,
  anchorLinks: Proptypes.array.isRequired
};

export default NDCEnhancements;
