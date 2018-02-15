import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import cx from 'classnames';

import Nav from 'components/nav';
import BottomBar from 'components/footer/bottom-bar';
import Contact from 'components/contact';

import layout from 'styles/layout.scss';
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { routes } = this.props;
    const { pathname } = this.props.location;
    const isNdcs = pathname === '/ndcs' || pathname === '/ndcs/table';
    const isHomePage = pathname === '/';
    const className = cx(styles.footer, styles.border, {
      [styles.gray]: isHomePage || isNdcs
    });
    return (
      <footer className={className}>
        <div className={cx(layout.content, styles.nav)}>
          <Nav
            routes={routes}
            hideLogo
            hideActive
            reverse
            allowNested={false}
          />
          <Contact />
        </div>
        <BottomBar className={layout.content} />
      </footer>
    );
  }
}

Footer.propTypes = {
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
};

export default withRouter(Footer);
