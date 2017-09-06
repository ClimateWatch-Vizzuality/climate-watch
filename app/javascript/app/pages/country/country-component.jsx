import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';

import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import AnchorNav from 'components/anchor-nav';

import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';
import styles from './country-styles.scss';

class Country extends PureComponent {
  render() {
    const { country, anchorLinks, route } = this.props;
    return (
      <div>
        <Header image={background}>
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
        <div className={layout.content}>
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
        </div>
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
