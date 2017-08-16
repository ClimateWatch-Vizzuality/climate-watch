import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Map from 'components/map';
import paths from 'app/data/world-50m-paths';

import layout from 'styles/layout.scss';
import styles from './countries-select-styles.scss';

class CountriesSelect extends PureComponent {
  onCountryClick = (geometry) => {
    const { history } = this.props;
    const country = geometry.id;
    history.push(`countries/${country}`);
    this.props.onLeave();
  };

  computedStyles = (geography) => {
    if (geography.id === 'ESP') {
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
    return (
      <div className={cx(layout.content, styles.wrapper)}>
        <div className={styles.listContainer}>There will be a list here</div>
        <Map
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
  onLeave: Proptypes.func.isRequired
};

export default CountriesSelect;
