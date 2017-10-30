import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';

import layout from 'styles/layout.scss';
import styles from './about-styles.scss';

const About = ({ route, anchorLinks, query }) => (
  <div>
    <Header route={route}>
      <div className={layout.content}>
        <Intro title="About" />
        <AnchorNav useRoutes links={anchorLinks} query={query} />
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
