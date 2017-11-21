import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import { renderRoutes } from 'react-router-config';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import cx from 'classnames';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-scenario-styles.scss';

class EmissionPathwaysScenario extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, routeLinks, anchorLinks, scenario, id } = this.props;
    return (
      <div>
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        {scenario && (
          <div>
            <Header route={route}>
              <div className={layout.content}>
                <Intro
                  title={scenario.name}
                  description={scenario.description}
                />
              </div>
              <Sticky activeClass="stickyEmissionsScenario">
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
                  <div
                    id={section.hash}
                    className={cx(styles.sectionHash, styles[section.hash])}
                  >
                    <section.component routeLinks={routeLinks} id={id} />
                  </div>
                </div>
              ))}
            {renderRoutes(route.routes)}
          </div>
        )}
      </div>
    );
  }
}

EmissionPathwaysScenario.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  routeLinks: PropTypes.array.isRequired,
  id: PropTypes.string,
  scenario: PropTypes.object
};

export default EmissionPathwaysScenario;
