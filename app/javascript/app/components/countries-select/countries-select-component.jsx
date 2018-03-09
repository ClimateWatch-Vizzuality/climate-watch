import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

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
      countrySelectFilter,
      countriesList,
      onCountryClick,
      onCountryMouseEnter,
      onCountryMouseLeave,
      handleClickAnalytics
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        <div className={cx(layout.content, styles.content)}>
          <Search
            placeholder="Search a country"
            value={query}
            onChange={countrySelectFilter}
            className={styles.search}
            theme={searchCountriesTheme}
            autofocus={opened || autofocus}
          />
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
  opened: Proptypes.bool,
  countriesList: Proptypes.array,
  paths: Proptypes.array
};

export default CountriesSelect;
