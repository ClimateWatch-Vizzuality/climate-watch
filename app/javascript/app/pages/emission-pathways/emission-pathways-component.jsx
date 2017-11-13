import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import { renderRoutes } from 'react-router-config';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-styles.scss';

class EmissionPathways extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, anchorLinks, routeLinks } = this.props;
    return (
      <div>
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <Header route={route}>
          <div className={layout.content}>
            <Intro title="Emission Pathways" />
          </div>
          <Sticky activeClass="sticky">
            <AnchorNav
              links={anchorLinks}
              className={layout.content}
              theme={anchorNavRegularTheme}
            />
          </Sticky>
        </Header>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections.map(section => (
            <div key={section.hash} className={styles.section}>
              <div id={section.hash} className={styles.sectionHash} />
              <section.component routeLinks={routeLinks} />
            </div>
          ))}
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

EmissionPathways.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  routeLinks: PropTypes.array.isRequired
};

export default EmissionPathways;
