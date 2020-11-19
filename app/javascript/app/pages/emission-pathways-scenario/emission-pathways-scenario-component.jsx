import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import EspLocationsProvider from 'providers/esp-locations-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import styles from './emission-pathways-scenario-styles.scss';

class EmissionPathwaysScenario extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, anchorLinks, scenario, id } = this.props;
    return (
      <div>
        <SEOTags page={SEO_PAGES.pathways} href={location.href} />
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <EspLocationsProvider />
        <div>
          <Header route={route}>
            <div className={layout.content}>
              <div className="grid-column-item">
                <Intro
                  title={scenario && scenario.name}
                  description={scenario && scenario.description}
                  button={{
                    text: 'View model',
                    link: `/pathways/models/${scenario &&
                      scenario.model &&
                      scenario.model.id}`
                  }}
                  textColumns
                />
              </div>
            </div>
            <Sticky activeClass="sticky -emissions" top="#navBarMobile">
              <AnchorNav
                links={anchorLinks}
                className={styles.anchorNav}
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
