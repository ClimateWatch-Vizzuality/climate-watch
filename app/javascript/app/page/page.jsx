import React from 'react';
import Proptypes from 'prop-types';

import TopBar from 'components/topbar';
import Nav from 'components/nav';
import Header from 'components/header';

import styles from "./page-styles.scss"; // eslint-disable-line

const Layout = ({ children }) =>
  (<div>
    <TopBar />
    <Nav />
    <Header />
    {children}
  </div>);

Layout.propTypes = {
  children: Proptypes.node
};

export default Layout;
