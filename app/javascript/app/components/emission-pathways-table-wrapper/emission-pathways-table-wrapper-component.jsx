import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnchorNav from 'components/anchor-nav';
import layout from 'styles/layout.scss';
import Button from 'components/button';
import cx from 'classnames';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import { renderRoutes } from 'react-router-config';
import styles from './emission-pathways-table-wrapper-styles.scss';

class EmissionPathwaysTableWrapper extends PureComponent {
  render() {
    const { anchorLinks, routes } = this.props;
    return (
      <div className={layout.content}>
        <div className={cx(styles.col4, styles.tableMenuContainer)}>
          <AnchorNav
            useRoutes
            links={anchorLinks}
            theme={anchorNavLightTheme}
          />
          <Button color="yellow" className={styles.uploadButton}>
            Upload your model
          </Button>
        </div>
        {renderRoutes(routes)}
      </div>
    );
  }
}

EmissionPathwaysTableWrapper.propTypes = {
  anchorLinks: PropTypes.array,
  routes: PropTypes.array
};

export default EmissionPathwaysTableWrapper;
