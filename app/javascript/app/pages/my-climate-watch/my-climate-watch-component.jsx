import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import LoginProvider from 'providers/login-provider';
import Button from 'components/button';
import Loading from 'components/loading';
import startCase from 'lodash/startCase';
import { SOCIAL_APP_NAMES } from 'data/constants';
import { getLoginUrlBySocial } from 'utils/my-cw';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './my-climate-watch-styles';

const MyCw = ({ location, route, login, openCreator, logout }) => {
  let button = null;
  if (login.logged) {
    if (location.pathname.indexOf('account-settings') > -1) {
      button = {
        text: 'Logout',
        onClick: logout
      };
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
        {SOCIAL_APP_NAMES.map(socialName => (
          <Button
            key={socialName}
            className={styles.login}
            variant={socialName}
            href={getLoginUrlBySocial(socialName)}
          >
            Login with {startCase(socialName)}
          </Button>
        ))}
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
  openCreator: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default MyCw;
