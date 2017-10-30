import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { renderRoutes } from 'react-router-config';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import sortBy from 'lodash/sortBy';
import AnchorNav from 'components/anchor-nav';
import Sticky from 'react-stickynode';

import backIcon from 'assets/icons/back.svg';

import layout from 'styles/layout.scss';
import styles from './ndc-compare-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const {
      route,
      countriesOptions,
      activeCountriesOptions,
      handleDropDownChange,
      anchorLinks
    } = this.props;
    return (
      <div className={styles.wrapper}>
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
          <Sticky activeClass="sticky">
            <AnchorNav links={anchorLinks} className={layout.content} />
          </Sticky>
        </Header>
        <div className={styles.countrySelector}>
          <div className={cx(layout.content, styles.fourFold)}>
            <div
              className={cx(styles.selector, styles.offset, styles.separator)}
            >
              <Dropdown
                placeholder="Add a country"
                options={sortBy(countriesOptions, ['label'])}
                onValueChange={selected => handleDropDownChange(0, selected)}
                value={activeCountriesOptions[0]}
                transparent
              />
            </div>
            <div className={cx(styles.selector, styles.separator)}>
              <Dropdown
                placeholder="Add a second country"
                options={sortBy(countriesOptions, ['label'])}
                onValueChange={selected => handleDropDownChange(1, selected)}
                value={activeCountriesOptions[1]}
                transparent
              />
            </div>
            <div className={styles.selector}>
              <Dropdown
                placeholder="Add a third country"
                options={sortBy(countriesOptions, ['label'])}
                onValueChange={selected => handleDropDownChange(2, selected)}
                value={activeCountriesOptions[2]}
                transparent
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div>{renderRoutes(route.routes)}</div>
        </div>
      </div>
    );
  }
}

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  countriesOptions: PropTypes.array,
  activeCountriesOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func
};

export default NDCCountry;
