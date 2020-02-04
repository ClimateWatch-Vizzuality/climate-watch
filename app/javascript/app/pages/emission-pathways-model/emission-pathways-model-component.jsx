import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import { renderRoutes } from 'react-router-config';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-model-styles.scss';

class EmissionPathwaysModel extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, routeLinks, anchorLinks, model, id } = this.props;
    return (
      <div>
        <EspModelsProvider />
        <EspScenariosProvider />
        <div>
          <Header route={route}>
            <div className={layout.content}>
              <Intro
                title={model && model.full_name}
                description={model && model.description}
                textColumns
              />
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
              <div key={section.hash} className={styles.section}>
                <div id={section.hash} className={styles.sectionHash} />
                <section.component routeLinks={routeLinks} id={id} />
              </div>
            ))}
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

EmissionPathwaysModel.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  routeLinks: PropTypes.array.isRequired,
  id: PropTypes.string,
  model: PropTypes.object
};

export default EmissionPathwaysModel;
