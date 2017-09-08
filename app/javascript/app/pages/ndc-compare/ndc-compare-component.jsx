import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import Dropdown from 'components/dropdown';

import backIcon from 'assets/icons/back.svg';
import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';
import styles from './ndc-compare-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const { ndcsData, countriesOptions, activeCountriesOptions } = this.props;
    return (
      <div>
        <Header image={background}>
          <div className={cx(layout.content, styles.header)}>
            <div className={styles.title}>
              <Button
                className={styles.backButton}
                color="transparent"
                link="/ndcs"
                square
              >
                <Icon className={styles.backIcon} icon={backIcon} />
              </Button>
              <Intro title="NDC Comparison" />
            </div>
          </div>
        </Header>
        <div className={styles.countrySelector}>
          <div className={cx(layout.content, styles.threeFold)}>
            <Dropdown
              placeholder="Add a country"
              options={countriesOptions}
              value={activeCountriesOptions[0]}
            />
            <Dropdown
              placeholder="Add a country"
              options={countriesOptions}
              value={activeCountriesOptions[1]}
            />
            <Dropdown
              placeholder="Add a country"
              options={countriesOptions}
              value={activeCountriesOptions[2]}
            />
          </div>
        </div>
        <Accordion data={ndcsData} compare />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  ndcsData: Proptypes.array,
  countriesOptions: Proptypes.array,
  activeCountriesOptions: Proptypes.array
};

export default NDCCountry;
