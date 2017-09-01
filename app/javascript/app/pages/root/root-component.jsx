import React from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import TopBar from 'components/topbar';
import Nav from 'components/nav';

import styles from "./root-styles.scss"; // eslint-disable-line

const Page = ({ route }) =>
  (<div>
    <TopBar />
    <Nav />
    {renderRoutes(route.routes)}
  </div>);

Page.propTypes = {
  route: Proptypes.object
};

export default Page;
