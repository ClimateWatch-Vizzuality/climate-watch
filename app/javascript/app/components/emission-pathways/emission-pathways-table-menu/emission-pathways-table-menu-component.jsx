import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnchorNav from 'components/anchor-nav';
import layout from 'styles/layout.scss';
import Button from 'components/button';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';

import styles from './emission-pathways-table-menu-styles.scss';

class EmissionPathwaysTableMenu extends PureComponent {
  render() {
    const { routeLinks, uploadButton } = this.props;
    const wantToText = (
      <div className={styles.actionText}>
        Want to provide feedback or add data for a model?
      </div>
    );

    const button = (
      <Button variant="primary" href="mailto:ClimateWatch@WRI.org">
        Get in touch
      </Button>
    );

    return (
      <div className={layout.content}>
        <div className="grid-column-item">
          <div
            className={styles.tableMenuContainer}
            role="menubar"
            tabIndex={-1}
          >
            <AnchorNav
              useRoutes
              links={routeLinks}
              theme={anchorNavLightTheme}
            />
            {uploadButton && (
              <React.Fragment>
                <TabletLandscape>
                  {wantToText}
                  {button}
                </TabletLandscape>
                <TabletPortraitOnly>
                  <div>
                    {wantToText}
                    {button}
                  </div>
                </TabletPortraitOnly>
              </React.Fragment>
            )}
          </div>
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
