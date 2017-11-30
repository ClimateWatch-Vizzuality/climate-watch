import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import Search from 'components/search';
import ResultsList from 'components/results-list';
import Map from 'components/map';

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
      countrySelectFilter,
      countriesList,
      onCountryClick,
      onCountryMouseEnter,
      onCountryMouseLeave
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        <div className={cx(layout.content, styles.content)}>
          <Search
            placeholder=""
            value={query}
            onChange={countrySelectFilter}
            className={styles.search}
            theme={searchCountriesTheme}
          />
          <ResultsList
            list={countriesList}
            className={styles.list}
            emptyDataMsg="No results"
            theme={resultsListLightTheme}
            handleMouseItemEnter={onCountryMouseEnter}
            handleMouseItemLeave={onCountryMouseLeave}
          />
          <Map
            cache={false}
            paths={paths}
            className={styles.map}
            onCountryClick={onCountryClick}
            customCenter={[20, 15]}
          />
        </div>
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  query: Proptypes.string,
  onCountryClick: Proptypes.func.isRequired,
  countrySelectFilter: Proptypes.func.isRequired,
  onCountryMouseEnter: Proptypes.func.isRequired,
  onCountryMouseLeave: Proptypes.func.isRequired,
  countriesList: Proptypes.array,
  className: Proptypes.string,
  paths: Proptypes.array
};

export default CountriesSelect;
