import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import BackButton from 'components/back-button';
import Dropdown from 'components/dropdown';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';

import layout from 'styles/layout.scss';
import styles from './custom-compare-styles.scss';

const tempOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' }
];

const Filter = ({ key }) => (
  <div className={styles.filter}>
    <Dropdown
      key={`${key}-country`}
      label=""
      options={tempOptions}
      onValueChange={() => {}}
      value={tempOptions[0]}
      hideResetButton
      theme={{ dropdown: styles.dropdown }}
      className={styles.dropdown}
    />
    <Dropdown
      key={`${key}-submission`}
      label=""
      options={tempOptions}
      onValueChange={() => {}}
      value={tempOptions[0]}
      hideResetButton
    />
  </div>
);

Filter.propTypes = {
  key: PropTypes.string.isRequired
};

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
      <div className={styles.filtersWrapper}>
        <div className={styles.content}>
          <div className={styles.filters}>
            <Filter key="1" />
            <Filter key="2" />
            <Filter key="3" />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.accordions}>CONTENT HERE</div>
      </div>
    </div>
  );
};

CustomComparisonComponent.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array
};

export default CustomComparisonComponent;
