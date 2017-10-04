import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import sortBy from 'lodash/sortBy';

import backIcon from 'assets/icons/back.svg';

import layout from 'styles/layout.scss';
import styles from './ndc-compare-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const {
      route,
      ndcsData,
      countriesOptions,
      activeCountriesOptions,
      handleDropDownChange,
      loading
    } = this.props;
    return (
      <div>
        <Header route={route}>
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
          <div className={cx(layout.content, styles.fourFold)}>
            <div
              className={cx(styles.selector, styles.offset, styles.separator)}
            >
              <Dropdown
                placeholder="Add a country"
                options={sortBy(countriesOptions, ['label'])}
                onChange={selected => handleDropDownChange(0, selected)}
                value={activeCountriesOptions[0]}
                transparent
              />
            </div>
            <div className={cx(styles.selector, styles.separator)}>
              <Dropdown
                placeholder="Add a second country"
                options={sortBy(countriesOptions, ['label'])}
                onChange={selected => handleDropDownChange(1, selected)}
                value={activeCountriesOptions[1]}
                transparent
              />
            </div>
            <div className={styles.selector}>
              <Dropdown
                placeholder="Add a third country"
                options={sortBy(countriesOptions, ['label'])}
                onChange={selected => handleDropDownChange(2, selected)}
                value={activeCountriesOptions[2]}
                transparent
              />
            </div>
          </div>
        </div>
        <Accordion data={ndcsData} loading={loading} compare />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  ndcsData: PropTypes.array,
  countriesOptions: PropTypes.array,
  activeCountriesOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func,
  loading: PropTypes.bool
};

export default NDCCountry;
