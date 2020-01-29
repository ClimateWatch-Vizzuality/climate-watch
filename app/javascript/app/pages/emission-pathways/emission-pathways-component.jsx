/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import { renderRoutes } from 'react-router-config';

import { EMISSION_PATHWAYS } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-styles.scss';

class EmissionPathways extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, anchorLinks, routeLinks, setActiveSection } = this.props;
    return (
      <div>
        <MetaDescription
          descriptionContext={EMISSION_PATHWAYS}
          subtitle="Pathways"
        />
        <SocialMetadata
          descriptionContext={EMISSION_PATHWAYS}
          href={location.href}
        />
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <Header route={route}>
          <div className={layout.content}>
            <div className="grid-column-item">
              <Intro
                title="Pathways"
                description={
                  'Explore economic and emissions scenarios to identify opportunities for delivering on countries’ sustainable development and climate goals. Choose from a comprehensive database of models from the IPCC, private sector and country-specific providers to see its assumptions and results.'
                }
                disclaimer="This page is under development. More data and new functions will be added over time."
              />
            </div>
          </div>
          <Sticky activeClass="sticky -emissions" top="#navBarMobile">
            <AnchorNav
              links={anchorLinks}
              theme={anchorNavRegularTheme}
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
                <section.component routeLinks={routeLinks} uploadButton />
              </div>
            </Waypoint>
          ))}
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

EmissionPathways.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  routeLinks: PropTypes.array.isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default EmissionPathways;
