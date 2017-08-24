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
import styles from './ndc-country-styles.scss';

class NDCCountry extends PureComponent {
  componentWillMount() {
    const { hasData, match, fetchCountryNDC } = this.props;
    const { iso } = match.params;
    if (!hasData && iso) {
      fetchCountryNDC(iso);
    }
  }

  render() {
    const { country, match } = this.props;
    return (
      <div>
        <Header image={background}>
          <div className={cx(styles.doubleFold, styles.header)}>
            <div className={styles.title}>
              <Button
                className={styles.backIcon}
                color="transparent"
                link="/ndcs"
                type="icon"
              >
                <Icon icon={backIcon} />
              </Button>
              <Intro title={country.label} />
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
              <Search theme={lightSearch} placeholder="Search" />
            </div>
          </div>
        </Header>
        <Accordion />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  match: Proptypes.object.isRequired,
  hasData: Proptypes.bool.isRequired,
  country: Proptypes.object.isRequired,
  fetchCountryNDC: Proptypes.func.isRequired // eslint-disable-line
};

export default NDCCountry;
