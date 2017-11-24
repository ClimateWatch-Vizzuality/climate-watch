import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import EspIndicatorsTrendDataProvider from 'providers/esp-indicators-trend-provider';
import styles from './emission-pathways-scenario-styles.scss';

class EmissionPathwaysScenario extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, anchorLinks, scenario, id } = this.props;
    return (
      <div>
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <EspIndicatorsTrendDataProvider scenarioId={id} locationId={267} />
        <div>
          <Header route={route}>
            <div className={layout.content}>
              <Intro
                title={scenario && scenario.name}
                description={scenario && scenario.description}
                button={{
                  text: 'View model',
                  link: `/emission-pathways/models/${scenario &&
                    scenario.model_id}`
                }}
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
                <div id={section.hash} className={styles.sectionHash} />
                <section.component id={id} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

EmissionPathwaysScenario.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  id: PropTypes.string,
  scenario: PropTypes.object
};

export default EmissionPathwaysScenario;
