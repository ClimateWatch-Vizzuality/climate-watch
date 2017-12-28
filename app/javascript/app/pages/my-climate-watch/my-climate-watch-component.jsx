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

import layout from 'styles/layout.scss';
import styles from './my-climate-watch-styles';

const MyCw = ({ route, login }) => {
  const button = login.logged
    ? { text: 'Create an insight', link: '/my-climate-watch/editor' }
    : null;
  let content = <Loading className={styles.loading} />;
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
          <AnchorNav useRoutes links={route.routes} theme={styles} />
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
  route: PropTypes.object.isRequired
};

export default MyCw;
