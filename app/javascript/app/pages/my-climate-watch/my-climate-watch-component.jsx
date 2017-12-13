import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import layout from 'styles/layout.scss';
import styles from './my-climate-watch-styles';

const button = { text: 'Create an insight', link: 'editor' };

const MyCw = ({ route }) => (
  <div>
    <Header theme={styles}>
      <div className={layout.content}>
        <Intro theme={styles} title="My Climate Watch" button={button} />
        <AnchorNav useRoutes links={route.routes} theme={styles} />
      </div>
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderRoutes(route.routes)}</div>
    </div>
  </div>
);

MyCw.propTypes = {
  route: PropTypes.object.isRequired
};

export default MyCw;
