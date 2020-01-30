import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import { ABOUT } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './about-styles.scss';

const About = ({ route, anchorLinks, query }) => (
  <div>
    <MetaDescription descriptionContext={ABOUT} subtitle="About" />
    <SocialMetadata descriptionContext={ABOUT} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <Intro title="About" />
        </div>
      </div>
      <Sticky activeClass="sticky -about" top="#navBarMobile">
        <AnchorNav
          useRoutes
          links={anchorLinks}
          query={query}
          theme={anchorNavRegularTheme}
          className={styles.anchorNav}
        />
      </Sticky>
    </Header>
    <div>{renderRoutes(route.routes)}</div>
  </div>
);

About.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired
};

export default About;
