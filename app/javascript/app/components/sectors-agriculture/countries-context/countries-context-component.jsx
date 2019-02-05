import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'cw-components';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import AgricultureCountriesContextProvider from 'providers/agriculture-countries-context-provider';
import ContextByCountry from './context-by-country';
import ContextByIndicator from './context-by-indicator';
import styles from './countries-context-styles.scss';

const tabs = [
  {
    name: 'EXPLORE BY INDICATOR',
    value: 'indicator',
    filter: 'contextBy'
  },
  {
    name: 'EXPLORE BY COUNTRY',
    value: 'country',
    filter: 'contextBy'
  }
];

const SwitchOptionsComponents = {
  country: ContextByCountry,
  indicator: ContextByIndicator
};

class CountriesContext extends PureComponent {
  render() {
    const { query, selectedCountry, handleSwitchClick } = this.props;

    const switchOption = (query && query.contextBy) || 'indicator';

    const Component = SwitchOptionsComponents[switchOption];

    return (
      <div className={styles.container}>
        <div>
          <h2 className={styles.header}>Countries Context</h2>
          <div className={styles.intro}>
            <p className={styles.introText}>
              The agricultural sector differs vastly among countries and affects
              jobs, economy, land-use, water and food security. Explore key
              indicators of progress over time below.
            </p>
            <div className={styles.switchWrapper}>
              <Switch
                options={tabs}
                selectedOption={switchOption}
                onClick={handleSwitchClick}
                theme={{
                  wrapper: styles.switch,
                  option: styles.switchOption,
                  checkedOption: styles.switchSelected
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {selectedCountry ? (
            <Component {...this.props} />
          ) : (
            <div>SELECT A COUNTRY</div>
          )}
        </div>
        <WbCountryDataProvider />
        <AgricultureCountriesContextProvider
          country={selectedCountry && selectedCountry.value}
        />
      </div>
    );
  }
}

CountriesContext.propTypes = {
  query: PropTypes.shape({}),
  selectedCountry: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  handleSwitchClick: PropTypes.func.isRequired
};

export default CountriesContext;
