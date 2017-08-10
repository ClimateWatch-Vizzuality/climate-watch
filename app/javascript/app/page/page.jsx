import React from 'react';
import Proptypes from 'prop-types';

import TopBar from 'components/topbar';
import Nav from 'components/nav';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Icon from 'components/icon';

import iconDownload from 'assets/icons/download.svg';
import styles from "./page-styles.scss"; // eslint-disable-line

const Layout = ({ children }) =>
  (<div>
    <TopBar />
    <Nav />
    <Header>
      <Intro title="Climate Watch" description="A very useful site" />
      <div className={styles.buttonGroup}>
        <Button className="download-button" type="icon" color="transparent">
          <Icon icon={iconDownload} className={styles.button} />
        </Button>
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
