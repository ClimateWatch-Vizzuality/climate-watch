import React from 'react';
import Proptypes from 'prop-types';

import Data from 'components/data';
import TopBar from 'components/topbar';
import Nav from 'components/nav';

import styles from "./container-styles.scss"; // eslint-disable-line

const Page = ({ children }) =>
  (<div>
    <Data>
      <TopBar />
      <Nav />
      {children}
    </Data>
  </div>);

Page.propTypes = {
  children: Proptypes.node
};

export default Page;
