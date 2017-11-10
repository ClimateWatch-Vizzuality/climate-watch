import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';
import ESPLocationsProvider from 'providers/esp-locations-provider';

import layout from 'styles/layout.scss';
import styles from './emission-pathways-styles.scss';

class EmissionPathways extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, anchorLinks } = this.props;
    return (
      <div>
        <ESPLocationsProvider />
        <Header route={route}>
          <div className={layout.content}>
            <Intro title="Emission Pathways" />
          </div>
          <Sticky activeClass="sticky">
            <AnchorNav links={anchorLinks} className={layout.content} />
          </Sticky>
        </Header>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections.map(section => (
            <div key={section.hash} className={styles.section}>
              <div id={section.hash} className={styles.sectionHash} />
              <section.component routes={section.routes} />
            </div>
          ))}
      </div>
    );
  }
}

EmissionPathways.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired
};

export default EmissionPathways;
