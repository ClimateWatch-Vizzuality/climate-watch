import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import CountriesProvider from 'providers/countries-provider';
import { isPageNdcp } from 'utils/navigation';
import cwLogo from 'assets/icons/cw-logo.svg';
import cx from 'classnames';
import Icon from 'components/icon';

import layout from 'styles/layout';
import styles from './embed-styles.scss';

class Embed extends PureComponent {
  render() {
    const { route, location } = this.props;
    const link = location.pathname.replace('/embed', '');
    const isNdcp = isPageNdcp(location);
    return (
      <div className={styles.embed}>
        <CountriesProvider />
        <div
          className={cx(layout.content, styles.embedContent, {
            [styles.hasFooter]: !isNdcp
          })}
        >
          {renderRoutes(route.routes)}
        </div>
        {!isNdcp && (
          <div className={styles.footer}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Icon className={styles.logo} icon={cwLogo} />
            </a>
          </div>
        )}
      </div>
    );
  }
}

Embed.propTypes = {
  route: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired
};

export default Embed;
