import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';

import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import AnchorNav from 'components/anchor-nav';
import ModalMetadata from 'components/modal-metadata';

import layout from 'styles/layout.scss';
import styles from './country-styles.scss';

class Country extends PureComponent {
  render() {
    const { route, country, anchorLinks } = this.props;
    return (
      <div>
        <Header route={route}>
          <div className={cx(layout.content, styles.header)}>
            <Intro title={country.name} />
            <Button
              color="yellow"
              link={`/ndcs/compare?locations=${country.iso}`}
            >
              Compare
            </Button>
          </div>
          <Sticky activeClass="sticky">
            <AnchorNav links={anchorLinks} className={layout.content} />
          </Sticky>
        </Header>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections.map(section => (
            <div
              key={section.hash}
              id={section.hash}
              className={styles.section}
            >
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
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  anchorLinks: PropTypes.array.isRequired,
  route: PropTypes.object.isRequired
};

export default Country;
