import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';
import Button from 'components/button';
import Icon from 'components/icon';
import Search from 'components/search';
import cx from 'classnames';

import backIcon from 'assets/icons/back.svg';
import lightSearch from 'styles/themes/search/search-light.scss';
import layout from 'styles/layout.scss';
import styles from './ndc-country-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const {
      country,
      match,
      onSearchChange,
      search,
      ndcsData,
      loading,
      route
    } = this.props;
    return (
      <div>
        {country && (
          <Header route={route}>
            <div
              className={cx(layout.content, styles.doubleFold, styles.header)}
            >
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
                <Button
                  color="yellow"
                  link={`/ndcs/country/${match.params.iso}/full`}
                >
                  View full NDC
                </Button>
                <Button
                  color="yellow"
                  link={`/ndcs/compare?locations=${match.params.iso}`}
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
        )}
        <Accordion
          className={styles.accordion}
          data={ndcsData}
          loading={loading}
        />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  country: PropTypes.object,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  ndcsData: PropTypes.array,
  loading: PropTypes.bool
};

export default NDCCountry;
