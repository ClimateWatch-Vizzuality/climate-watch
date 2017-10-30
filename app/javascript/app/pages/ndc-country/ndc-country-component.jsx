import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';
import Button from 'components/button';
import Icon from 'components/icon';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';

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
      route,
      anchorLinks
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
              <Sticky activeClass="sticky">
                <AnchorNav links={anchorLinks} className={layout.content} />
              </Sticky>
            </div>
          </Header>
        )}
        <div className={styles.wrapper}>
          <div className={layout.content}>{renderRoutes(route.routes)}</div>
        </div>
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
  loading: PropTypes.bool,
  anchorLinks: PropTypes.array
};

export default NDCCountry;
