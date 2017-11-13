import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnchorNav from 'components/anchor-nav';
import layout from 'styles/layout.scss';
import Button from 'components/button';
import cx from 'classnames';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import styles from './emission-pathways-table-menu-styles.scss';

class EmissionPathwaysTableMenu extends PureComponent {
  render() {
    const { routeLinks } = this.props;
    return (
      <div className={layout.content}>
        <div className={cx(styles.col4, styles.tableMenuContainer)}>
          <AnchorNav useRoutes links={routeLinks} theme={anchorNavLightTheme} />
          <Button color="yellow" className={styles.uploadButton}>
            Upload your model
          </Button>
        </div>
      </div>
    );
  }
}

EmissionPathwaysTableMenu.propTypes = {
  routeLinks: PropTypes.array
};

export default EmissionPathwaysTableMenu;
