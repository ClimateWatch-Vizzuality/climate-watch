import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';
import Button from 'components/button';
import Icon from 'components/icon';
import Search from 'components/search';
import cx from 'classnames';

import backIcon from 'assets/icons/back.svg';
import lightSearch from 'styles/themes/search-light.scss';
import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';
import styles from './ndc-country-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const { country, match, onSearchChange, search, ndcsData } = this.props;
    return (
      <div>
        <Header image={background}>
          <div className={cx(layout.content, styles.doubleFold, styles.header)}>
            <div className={styles.title}>
              <Button
                className={styles.backButton}
                color="transparent"
                link="/ndcs"
                square
              >
                <Icon className={styles.backIcon} icon={backIcon} />
              </Button>
              <Intro title={country.wri_standard_name} />
            </div>
            <div className={styles.threeFold}>
              <Button color="yellow" link={`/ndcs/${match.params.iso}/full`}>
                View full NDC
              </Button>
              <Button
                color="yellow"
                link={`/ndcs/compare?countries=${match.params.iso}`}
              >
                Compare
              </Button>
              <Search
                theme={lightSearch}
                placeholder="Search"
                input={search}
                onChange={onSearchChange}
              />
            </div>
          </div>
        </Header>
        <Accordion data={ndcsData} />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  match: Proptypes.object.isRequired,
  country: Proptypes.object.isRequired,
  onSearchChange: Proptypes.func.isRequired,
  search: Proptypes.string,
  ndcsData: Proptypes.array
};

export default NDCCountry;
