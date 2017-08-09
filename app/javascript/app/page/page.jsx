import React from 'react';
import Proptypes from 'prop-types';

import TopBar from 'components/topbar';
import Nav from 'components/nav';
import styles from './page-styles.scss';

const Layout = ({ children }) => (
  <div className={styles.body}>
    <TopBar />
    {children}
  </div>
);

Layout.propTypes = {
  children: Proptypes.node
};

export default Layout;
