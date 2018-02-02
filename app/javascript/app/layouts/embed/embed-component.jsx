import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import CountriesProvider from 'providers/countries-provider';
import cwLogo from 'assets/icons/cw-logo.svg';
import Icon from 'components/icon';

import layout from 'styles/layout';
import styles from './embed-styles.scss';

class Embed extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div className={[layout.content, styles.embed]}>
        <CountriesProvider />
        <div className={styles.embedContent}>{renderRoutes(route.routes)}</div>
        <div className={styles.footer}>
          For more information, visit
          <a
            href="https://www.climatewatchdata.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className={styles.logo} icon={cwLogo} />
          </a>
        </div>
      </div>
    );
  }
}

Embed.propTypes = {
  route: Proptypes.object
};

export default Embed;
