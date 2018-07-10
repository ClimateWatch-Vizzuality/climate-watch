import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import LoginProvider from 'providers/login-provider';
import Button from 'components/button';
import Loading from 'components/loading';

import { LOGIN_URL } from 'data/constants';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './my-climate-watch-styles';

const MyCw = ({ location, route, login, openCreator }) => {
  let button = null;
  if (login.logged) {
    if (location.pathname.indexOf('account-settings') > -1) {
      button = { text: 'Logout' };
    } else {
      button = { text: 'Create a Visualization', onClick: () => openCreator() };
    }
  }
  let content = <Loading className={styles.loading} height={300} />;
  if (login.loaded) {
    content = login.logged ? (
      renderRoutes(route.routes)
    ) : (
      <div className={styles.loginContainer}>
        <Button className={styles.login} color="yellow" href={LOGIN_URL}>
          Login
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Header theme={styles}>
        <div className={layout.content}>
          <Intro theme={styles} title="My Climate Watch" button={button} />
          <AnchorNav
            useRoutes
            links={route.routes}
            theme={anchorNavRegularTheme}
            gradientColor={route.headerColor}
          />
        </div>
      </Header>
      <LoginProvider />
      <div className={styles.wrapper}>
        <div className={layout.content}>{content}</div>
      </div>
    </div>
  );
};

MyCw.propTypes = {
  login: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  openCreator: PropTypes.func.isRequired
};

export default MyCw;
