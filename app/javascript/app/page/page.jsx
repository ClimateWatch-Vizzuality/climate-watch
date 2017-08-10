import React from 'react';
import Proptypes from 'prop-types';

import TopBar from 'components/topbar';
import Nav from 'components/nav';

import styles from "./page-styles.scss"; // eslint-disable-line

const Page = ({ children }) =>
  (<div>
    <TopBar />
    <Nav />
    {children}
  </div>);

Page.propTypes = {
  children: Proptypes.node
};

export default Page;
