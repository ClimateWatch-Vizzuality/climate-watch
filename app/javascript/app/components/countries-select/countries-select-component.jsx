import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import { deburrUpper } from 'app/utils';
import includes from 'lodash/includes';
import paths from 'app/data/world-50m-paths';

import Search from 'components/search';
import ResultsList from 'components/results-list';
import Map from 'components/map';

import layout from 'styles/layout.scss';
import styles from './countries-select-styles.scss';

class CountriesSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.queryUpper = deburrUpper(props.query);
  }

  componentWillReceiveProps(props) {
    this.queryUpper = deburrUpper(props.query);
  }

  onCountryClick = (geometry) => {
    const { history } = this.props;
    const country = geometry.id;
    history.push(`countries/${country}`);
    this.props.onLeave();
  };

  computedStyles = (geography) => {
    const nameUpper = deburrUpper(geography.properties.name);
    const isInFilter = this.queryUpper
      ? includes(nameUpper, this.queryUpper)
      : false;
    if (isInFilter) {
      return {
        default: {
          fill: '#302463',
          stroke: '#607D8B',
          strokeWidth: 0.2,
          outline: 'none'
        },
        hover: {},
        pressed: {}
      };
    }
    return {
      default: {
        fill: '#ECEFF1',
        stroke: '#607D8B',
        strokeWidth: 0.2,
        outline: 'none'
      },
      hover: {
        fill: '#302463',
        stroke: '#607D8B',
        strokeWidth: 0.2,
        outline: 'none'
      },
      pressed: {
        fill: '#FF5722',
        stroke: '#607D8B',
        strokeWidth: 0.5,
        outline: 'none'
      }
    };
  };

  render() {
    const { query, countrySelectFilter, countriesList } = this.props;
    return (
      <div className={cx(layout.content, styles.wrapper)}>
        <Search placeholder="" value={query} onChange={countrySelectFilter} />
        <ResultsList list={countriesList} emptyDataMsg="No results" />
        <Map
          cache={false}
          paths={paths}
          onCountryClick={this.onCountryClick}
          computedStyles={this.computedStyles}
        />
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  history: Proptypes.object,
  onLeave: Proptypes.func.isRequired,
  query: Proptypes.string,
  countrySelectFilter: Proptypes.func.isRequired,
  countriesList: Proptypes.array
};

export default CountriesSelect;
