import React from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import anchorNavContainedTheme from 'styles/themes/anchor-nav/anchor-nav-contained.scss';
import { NDC_CONTENT } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { isPageContained } from 'utils/navigation';

import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

const NDC = ({ anchorLinks, query, route }) => (
  <div>
    <MetaDescription descriptionContext={NDC_CONTENT} subtitle="NDC CONTENT" />
    <SocialMetadata descriptionContext={NDC_CONTENT} href={location.href} />
    {isPageContained ? (
      <div className={layout.content}>
        <div className={styles.containedHeader}>
          <AnchorNav
            useRoutes
            links={anchorLinks}
            query={query}
            className={styles.anchorNav}
            theme={anchorNavContainedTheme}
          />
          <AutocompleteSearch variant="plain" />
        </div>
      </div>
    ) : (
      <Header route={route}>
        <div className={layout.content}>
          <div className="grid-column-item">
            <div className={styles.headerLayout}>
              <Intro title="NDC Content" />
              <AutocompleteSearch />
            </div>
          </div>
        </div>
        <AnchorNav
          useRoutes
          links={anchorLinks}
          query={query}
          className={styles.anchorNav}
          theme={anchorNavRegularTheme}
        />
      </Header>
    )}
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
