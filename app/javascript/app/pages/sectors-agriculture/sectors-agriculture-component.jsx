import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import cx from 'classnames';
import AgricultureEmissionsProvider from 'providers/agriculture-emissions-provider/agriculture-emissions-provider';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './sectors-agriculture-styles';

class SectorsAgriculture extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, anchorLinks, setActiveSection } = this.props;
    return (
      <div>
        {/* PROVIDERS HERE */}
        <AgricultureEmissionsProvider />

        <Header route={route}>
          <div className={cx(layout.content, styles.headerContent)}>
            <div className="grid-column-item">
              <Intro
                title="Agriculture"
                description={
                  'Agriculture is the second-largest contributor to global greenhouse gas emissions. This profile shows you where emissions come from (including direct and indirect emissions), what actions countries have proposed in their NDCs and resources for more action.'
                }
              />
            </div>
          </div>
          <Sticky activeClass="sticky -sectors-agriculture" top="#navBarMobile">
            <AnchorNav
              links={anchorLinks}
              theme={anchorNavRegularTheme}
              gradientColor={route.headerColor}
              className={styles.anchorNav}
            />
          </Sticky>
        </Header>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections.map(section => (
            <Waypoint
              bottomOffset={'40%'}
              topOffset={'40%'}
              onEnter={() => {
                setActiveSection(section.hash);
              }}
              fireOnRapidScroll={false}
              key={section.hash}
            >
              <div className={styles.section}>
                <div id={section.hash} className={styles.sectionHash} />
                <section.component />
              </div>
            </Waypoint>
          ))}
      </div>
    );
  }
}

SectorsAgriculture.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default SectorsAgriculture;
