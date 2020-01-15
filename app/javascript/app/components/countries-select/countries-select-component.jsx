import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/button';
import Search from 'components/search';
import ResultsList from 'components/results-list';
import Map from 'components/map/map-component';
import { TabletLandscape } from 'components/responsive';

import layout from 'styles/layout.scss';
import resultsListLightTheme from 'styles/themes/results-list/results-list-light.scss';
import searchCountriesTheme from 'styles/themes/search/search-countries.scss';
import styles from './countries-select-styles.scss';

class CountriesSelect extends PureComponent {
  render() {
    const {
      query,
      paths,
      className,
      autofocus,
      opened,
      isCompareVisible,
      countrySelectFilter,
      countriesList,
      onCountryClick,
      onCountryMouseEnter,
      onCountryMouseLeave,
      handleClickAnalytics,
      handleMarkerClick,
      markers
    } = this.props;

    return (
      <div className={cx(styles.wrapper, className)}>
        <div className={cx(layout.content, styles.content)}>
          <div className="grid-layout-element">
            <div
              className={cx({
                [styles.searchAndCompare]: isCompareVisible
              })}
            >
              <Search
                placeholder="Search a country"
                value={query}
                onChange={countrySelectFilter}
                theme={searchCountriesTheme}
                autofocus={opened || autofocus}
              />
              {isCompareVisible && (
                <Button variant="secondary" link="/countries/compare">
                  Compare
                </Button>
              )}
            </div>
          </div>
          <div className="grid-colum-item">
            <div className={styles.columns}>
              <ResultsList
                list={countriesList}
                className={styles.list}
                emptyDataMsg="No results"
                theme={resultsListLightTheme}
                handleMouseItemEnter={onCountryMouseEnter}
                handleMouseItemLeave={onCountryMouseLeave}
                handleClick={handleClickAnalytics}
              />
              <TabletLandscape>
                <Map
                  cache={false}
                  paths={paths}
                  zoomEnable={false}
                  className={styles.map}
                  onCountryClick={onCountryClick}
                  markers={markers}
                  handleMarkerClick={handleMarkerClick}
                  customCenter={[20, 15]}
                  dragEnable={false}
                />
              </TabletLandscape>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  query: Proptypes.string,
  className: Proptypes.string,
  autofocus: Proptypes.bool,
  onCountryClick: Proptypes.func.isRequired,
  countrySelectFilter: Proptypes.func.isRequired,
  onCountryMouseEnter: Proptypes.func.isRequired,
  onCountryMouseLeave: Proptypes.func.isRequired,
  handleClickAnalytics: Proptypes.func.isRequired,
  handleMarkerClick: Proptypes.func.isRequired,
  markers: Proptypes.array,
  opened: Proptypes.bool,
  isCompareVisible: Proptypes.bool,
  countriesList: Proptypes.array,
  paths: Proptypes.array
};

export default CountriesSelect;
