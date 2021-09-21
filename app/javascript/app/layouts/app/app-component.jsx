/* eslint-disable no-confusing-arrow */
import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { isPageContained, isEmbededComponent } from 'utils/navigation';
import { renderRoutes } from 'react-router-config';
import cx from 'classnames';
import PopUp from 'components/pop-up';
import CountriesProvider from 'providers/countries-provider';
import UserReport from 'components/user-report';
import { Desktop } from 'components/responsive';
import NavBarMobile from 'components/navbar-mobile';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import CookieConsent from 'components/cookie-consent';
import WebTour from 'components/web-tour';
import WebTourSwitch from 'components/web-tour/web-tour-switch';
import styles from './app-styles.scss';

const FEATURE_POP_UP = process.env.FEATURE_POP_UP === 'true';
const FEATURE_WEB_TOUR = process.env.FEATURE_WEB_TOUR === 'true';

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
        <CountriesProvider />
        {FEATURE_WEB_TOUR && <WebTour route={route} />}
        {FEATURE_WEB_TOUR && <WebTourSwitch />}
        <Desktop>
          {isDesktop =>
            isDesktop ? (
              <NavBar routes={navRoutes} />
            ) : (
              <NavBarMobile routes={navRoutes} />
            )
          }
        </Desktop>
        <div className={styles.pageWrapper}>
          {renderRoutes(route.routes.filter(r => r.path))}
        </div>
        <Footer />
        <UserReport />
        <CookieConsent />
        {FEATURE_POP_UP &&
          !isPageContained &&
          !isEmbededComponent(location) && <PopUp />}
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
