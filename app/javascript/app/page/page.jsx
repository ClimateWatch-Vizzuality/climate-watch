import React from 'react';
import Proptypes from 'prop-types';

import TopBar from 'components/topbar';
import Nav from 'components/nav';
import Header from 'components/header';
import Intro from 'components/intro';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';

import styles from "./page-styles.scss"; // eslint-disable-line

const Layout = ({ children }) =>
  (<div>
    <TopBar />
    <Nav />
    <Header>
      <Intro title="Climate Watch" description="A very useful site" />
      <div className={styles.buttonGroup}>
        <ButtonGroup />
        <Button className="download-button">
          <span>Compare</span>
        </Button>
      </div>
    </Header>
    {children}
  </div>);

Layout.propTypes = {
  children: Proptypes.node
};

export default Layout;
