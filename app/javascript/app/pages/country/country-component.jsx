import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Sticky from 'react-stickynode';

import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import AnchorNav from 'components/anchor-nav';
import SDGCard from 'components/sdg-card';

import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';
import styles from './country-styles.scss';

const sdg = {
  index: '1',
  title: 'No poverty',
  sections: [
    {
      number: 1.1,
      title:
        'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day',
      sectors: [77, 76, 75]
    },
    {
      number: 1.2,
      title:
        'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions',
      sectors: [77, 76, 75]
    }
  ]
};

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
        <SDGCard sdg={sdg} />
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
