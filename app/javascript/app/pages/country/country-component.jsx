import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';

import Header from 'components/header';
import CountryTimeline from 'components/country-timeline';
import Intro from 'components/intro';
import Button from 'components/button';
import AnchorNav from 'components/anchor-nav';
import ModalMetadata from 'components/modal-metadata';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';

import layout from 'styles/layout.scss';
import styles from './country-styles.scss';

class Country extends PureComponent {
  render() {
    const { route, country, anchorLinks, description } = this.props;
    return (
      <div>
        <SocioeconomicsProvider />
        <Header route={route}>
          <div className={cx(layout.content, styles.header)}>
            <Intro title={country.name} description={description} />
            <Button
              color="yellow"
              link={`/countries/compare?locations=${country.iso}`}
            >
              Compare
            </Button>
          </div>
          <div className={layout.content}>
            <CountryTimeline />
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
              <section.component />
            </div>
          ))}
        <ModalMetadata />
      </div>
    );
  }
}

Country.propTypes = {
  country: PropTypes.shape({
    iso: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string,
  anchorLinks: PropTypes.array.isRequired,
  route: PropTypes.object.isRequired
};

export default Country;
