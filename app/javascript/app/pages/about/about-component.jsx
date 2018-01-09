import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import { Helmet } from 'react-helmet';

import layout from 'styles/layout.scss';
import styles from './about-styles.scss';

const DESCRIPTION = `Climate Watch is an online platform designed to empower policymakers, researchers, media and
  other stakeholders with the open climate data, visualizations and resources they need to gather insights on
  national and global progress on climate change. Climate Watch brings together dozens of datasets for the first time.`;

const About = ({ route, anchorLinks, query }) => (
  <div>
    <Header route={route}>
      <div className={layout.content}>
        <Helmet>
          <title>Climate Watch: Data for Climate Action - About</title>
          <meta
            name="description"
            helmetKey="description"
            content={DESCRIPTION}
          />
        </Helmet>
        <Intro title="About" />
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

About.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired
};

export default About;
