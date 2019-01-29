import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Switch, Dropdown, Card, Icon, PieChart } from 'cw-components';
import CountriesProvider from 'providers/countries-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import AgricultureCountriesContextProvider from 'providers/agriculture-countries-context-provider';
import ButtonGroup from 'components/button-group';
import infoIcon from 'assets/icons/info';
import ContextByCountry from './context-by-country';
import ContextByIndicator from './context-by-indicators';
import LandArea from './land-area';
import MeatData from './meat-data';
import styles from './countries-context-styles.scss';

const tabs = [
  {
    name: 'EXPLORE BY INDICATOR',
    value: 'indicator'
  },
  {
    name: 'EXPLORE BY COUNTRY',
    value: 'country'
  }
];

const SwitchOptionsComponents = {
  country: ContextByCountry,
  indicator: ContextByIndicator
};

const buttonGroupConfig = [
  {
    type: 'info',
    onClick: () => {
      // TODO: Implement info button click
    }
  },
  {
    type: 'share',
    analyticsGraphName: 'Country/Ghg-emissions',
    positionRight: true
  },
  {
    type: 'download',
    section: 'ghg-emissions'
  },
  {
    type: 'addToUser'
  }
];

const cardTheme = {
  card: styles.card,
  data: styles.cardData,
  contentContainer: styles.titleContainer
};

class CountriesContext extends PureComponent {
  render() {
    const {
      countries,
      selectedCountry,
      years,
      selectedYear,
      cards,
      query,
      updateYearFilter,
      updateCountryFilter,
      handleInfoBtnClick,
      handleSwitchClick
    } = this.props;

    const switchOption = query.contextBy || 'indicator';

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
          <div className={styles.actionsContainer}>
            <div className={styles.selectorWrapper}>
              {countries && (
                <Dropdown
                  label={'Country'}
                  value={selectedCountry}
                  options={countries}
                  onValueChange={updateCountryFilter}
                  hideResetButton
                />
              )}
            </div>
            <div className={styles.timelineWrapper}>
              {selectedYear && (
                <Dropdown
                  label={'Year'}
                  value={selectedYear}
                  options={years}
                  onValueChange={updateYearFilter}
                  hideResetButton
                />
              )}
            </div>
            <div className={styles.buttonGroupWrapper}>
              <ButtonGroup
                className={styles.btnGroup}
                buttonsConfig={buttonGroupConfig}
              />
            </div>
          </div>
        </div>
        <div>
          {selectedCountry ? (
            <div className={styles.cardsContainer}>
              {cards &&
                cards.map(c => (
                  <Card key={c.title} title={c.title} theme={cardTheme}>
                    <div
                      className={cx(styles.textHtmlWrapper, styles.introText)}
                      dangerouslySetInnerHTML={{ __html: c.text }}
                    />
                    <div className={styles.cardContent}>
                      <div
                        className={cx(styles.textHtmlWrapper, styles.legend)}
                      >
                        {c.legend &&
                          c.legend.map(i => (
                            <div
                              key={i.title}
                              dangerouslySetInnerHTML={{ __html: i.text }}
                              className={styles.legendItem}
                            />
                          ))}
                      </div>
                      <div className={styles.chart}>
                        {c.chartConfig && (
                          <PieChart
                            data={c.chartData}
                            width={150}
                            config={c.chartConfig}
                          />
                        )}
                      </div>
                      {c.rank && (
                        <div
                          className={cx(styles.textHtmlWrapper, styles.rank)}
                          dangerouslySetInnerHTML={{ __html: c.rank }}
                        />
                      )}
                    </div>
                    <Icon
                      icon={infoIcon}
                      theme={{ icon: styles.cardInfoIcon }}
                      onClick={handleInfoBtnClick}
                    />
                    <div className={styles.yearData}>
                      <span>{selectedYear && selectedYear.value}</span> data
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <div>SELECT A COUNTRY</div>
          )}
        </div>
        {selectedCountry && <LandArea />}
        {selectedCountry && selectedYear && <MeatData />}
        <CountriesProvider />
        <WbCountryDataProvider />
        <AgricultureCountriesContextProvider
          country={selectedCountry && selectedCountry.value}
        />
      </div>
    );
  }
}

CountriesContext.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})),
  selectedCountry: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  years: PropTypes.arrayOf(PropTypes.shape({})),
  selectedYear: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  updateYearFilter: PropTypes.func.isRequired,
  updateCountryFilter: PropTypes.func.isRequired,
  handleInfoBtnClick: PropTypes.func.isRequired
};

export default CountriesContext;
