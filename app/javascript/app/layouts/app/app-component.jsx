import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import cx from 'classnames';

import CountriesProvider from 'providers/countries-provider';
import UserReport from 'components/user-report';
import { Desktop } from 'components/responsive';
import NavBarMobile from 'components/navbar-mobile';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import CookieConsent from 'components/cookie-consent';
import { HOME_PAGE } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import styles from './app-styles.scss'; // eslint-disable-line

class App extends PureComponent {
  render() {
    const { route, navRoutes, location, navbarMobileIsOpen } = this.props;
    return (
      <div
        id="app"
        className={cx(
          styles.app,
          navbarMobileIsOpen ? styles.mobileMenuOpen : ''
        )}
      >
        <MetaDescription descriptionContext={HOME_PAGE} />
        <SocialMetadata descriptionContext={HOME_PAGE} href={location.href} />
        <CountriesProvider />
        <Desktop>
          {isDesktop =>
            (isDesktop ? (
              <NavBar routes={navRoutes} />
            ) : (
              <NavBarMobile routes={navRoutes} />
            ))
          }
        </Desktop>
        <div className={styles.pageWrapper}>
          {renderRoutes(route.routes.filter(r => r.path))}
        </div>
        <Footer />
        <UserReport />
        <CookieConsent />
      </div>
    );
  }
}

App.propTypes = {
  route: Proptypes.object,
  navRoutes: Proptypes.array,
  location: Proptypes.object.isRequired,
  navbarMobileIsOpen: Proptypes.bool
};

export default App;
