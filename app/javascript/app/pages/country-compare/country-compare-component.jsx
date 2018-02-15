import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';

import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import CountryCompareSelector from 'components/country-compare/country-compare-selector';

import layout from 'styles/layout.scss';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import styles from './country-compare-styles.scss';

const CountryCompare = ({ route, anchorLinks }) => (
  <div>
    <Header route={route}>
      <div className={layout.content}>
        <Intro title={'Country Comparison'} />
      </div>
      <Sticky activeClass="sticky -country-compare" top="#navBarMobile">
        <AnchorNav
          links={anchorLinks}
          className={layout.content}
          theme={anchorNavRegularTheme}
          gradientColor={route.headerColor}
        />
      </Sticky>
    </Header>
    <CountryCompareSelector className={styles.countrySelectors} />
    {route.sections &&
      route.sections.length > 0 &&
      route.sections.map(section => (
        <section key={section.hash} id={section.hash}>
          {section.component && <section.component />}
        </section>
      ))}
  </div>
);

CountryCompare.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired
};

export default CountryCompare;
