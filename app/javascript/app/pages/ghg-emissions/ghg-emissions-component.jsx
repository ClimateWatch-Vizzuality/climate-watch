import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Header from 'components/header';
import Intro from 'components/intro';
import GhgEmissionsGraph from 'components/ghg-emissions';
import { HISTORICAL_GHG_EMISIONS, getMetaDescription } from 'data/SEO';

import layout from 'styles/layout.scss';
import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props;
    return (
      <div>
        {/* SEO data import */}
        {getMetaDescription(HISTORICAL_GHG_EMISIONS, 'GHG Emissions')}
        <Header route={route}>
          <div className={cx(layout.content, styles.header)}>
            <Intro title="Historical GHG Emissions" />
          </div>
        </Header>
        <div className={styles.wrapper}>
          <div className={layout.content}>
            <GhgEmissionsGraph />
          </div>
        </div>
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  route: PropTypes.object.isRequired
};

export default GhgEmissions;
