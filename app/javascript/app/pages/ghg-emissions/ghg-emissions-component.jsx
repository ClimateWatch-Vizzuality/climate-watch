import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Header from 'components/header';
import Intro from 'components/intro';
import GhgEmissionsGraph from 'components/ghg-emissions';

import layout from 'styles/layout.scss';
import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props;
    return (
      <div>
        <Helmet>
          <title>Climate Watch: Data for Climate Action - GHG Emissions</title>
          <meta
            name="description"
            content="Visualise the evolution of global emissions, or investigate specific sectors, gases or countries"
          />
        </Helmet>
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
