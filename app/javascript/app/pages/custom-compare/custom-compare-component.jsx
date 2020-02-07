import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import BackButton from 'components/back-button';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './custom-compare-styles.scss';

const CustomComparisonComponent = props => {
  const { route, anchorLinks } = props;

  return (
    <div>
      <Header route={route}>
        <div className={cx(layout.content, styles.header)}>
          <BackButton
            pathname="/compare-all-targets"
            backLabel="compare all targets"
          />
          <div className={styles.title}>
            <Intro title="Custom comparison" />
          </div>
        </div>
        <Sticky activeClass="sticky -compare" top="#navBarMobile">
          <AnchorNav
            useRoutes
            links={anchorLinks}
            className={styles.anchorNav}
            theme={anchorNavRegularTheme}
          />
        </Sticky>
      </Header>
      <div className={styles.content}>CONTENT HERE</div>
    </div>
  );
};

CustomComparisonComponent.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array
};

export default CustomComparisonComponent;
