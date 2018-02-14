import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';

// import {  } from 'data/SEO';
// import { MetaDescription, SocialMetadata } from 'components/seo';
// import { TabletLandscape } from 'components/responsive';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';

import layout from 'styles/layout.scss';

const CountryCompare = ({ route, anchorLinks }) => (
  <div>
    {/* <MetaDescription
    descriptionContext={ }
    subtitle={countryName}
  />
  <SocialMetadata
    descriptionContext={ }
    href={location.href}
  /> */}
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
  </div>
);

CountryCompare.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired
};

export default CountryCompare;
