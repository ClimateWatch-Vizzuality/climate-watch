import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnchorNav from 'components/anchor-nav';
import layout from 'styles/layout.scss';
import Button from 'components/button';
import cx from 'classnames';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';

import styles from './emission-pathways-table-menu-styles.scss';

class EmissionPathwaysTableMenu extends PureComponent {
  render() {
    const { routeLinks, uploadButton } = this.props;
    return (
      <div className={layout.content}>
        <div
          className={cx(styles.col4, styles.tableMenuContainer)}
          role="menubar"
          tabIndex={-1}
        >
          <AnchorNav
            useRoutes
            links={routeLinks}
            theme={anchorNavLightTheme}
            className={styles.nav}
          />
          {uploadButton && (
            <TabletLandscape>
              <span className={styles.buttonDetail}>
                Want to have your model in Climate Watch?
              </span>)
              <Button
                color="yellow"
                className={styles.uploadButton}
                href="mailto:ClimateWatch@WRI.org"
              >
                Get in touch
              </Button>
            </TabletLandscape>
          )}
          {uploadButton && (
            <TabletPortraitOnly>
              <div>
                <span className={styles.buttonDetail}>
                  Want to have your model in Climate Watch?
                </span>
                <Button
                  color="yellow"
                  className={styles.uploadButton}
                  href="mailto:ClimateWatch@WRI.org"
                >
                  Get in touch
                </Button>
              </div>
            </TabletPortraitOnly>
          )}
        </div>
      </div>
    );
  }
}

EmissionPathwaysTableMenu.propTypes = {
  routeLinks: PropTypes.array,
  uploadButton: PropTypes.bool
};

export default EmissionPathwaysTableMenu;
