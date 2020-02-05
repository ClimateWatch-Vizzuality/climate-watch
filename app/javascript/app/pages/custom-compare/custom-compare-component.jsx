import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './custom-compare-styles.scss';

const CustomComparisonComponent = props => {
  const { route, anchorLinks } = props;

  return (
    <div className={styles.wrapper}>
      <Header route={route}>
        <div className={cx(layout.content, styles.header)}>
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
      <div className={styles.wrapper}>SOME CONTENT HERE</div>
    </div>
  );
};

CustomComparisonComponent.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array
};

export default CustomComparisonComponent;
