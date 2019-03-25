import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'cw-components';
import Loading from 'components/loading';
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
    const { query, selectedCountry, handleSwitchClick, loading } = this.props;
    const switchOption = (query && query.contextBy) || 'indicator';

    const Component = SwitchOptionsComponents[switchOption];

    return (
      <div className={styles.container}>
        <div>
          <h2 className={styles.header}>Understand Countries{"'"} Context</h2>
          <div className={styles.intro}>
            <p className={styles.introText}>
              Agricultural practices and products not only influence emissions
              and water impacts, but also provide economic growth, jobs and food
              security. How countries can reduce their environmental impacts
              will be dependent on their unique circumstances.
            </p>
            <div className={styles.switchWrapper}>
              <Switch
                key={`explore-by-${switchOption}`}
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
          {loading ? (
            <Loading light className={styles.loader} />
          ) : (
            selectedCountry && <Component {...this.props} />
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
  loading: PropTypes.bool,
  handleSwitchClick: PropTypes.func.isRequired
};

export default CountriesContext;
