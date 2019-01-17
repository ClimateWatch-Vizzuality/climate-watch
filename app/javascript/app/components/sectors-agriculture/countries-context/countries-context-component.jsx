import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Switch, Dropdown, Card } from 'cw-components';
import CountriesProvider from 'providers/countries-provider';
import AgricultureCountriesContextProvider from 'providers/agriculture-countries-context-provider';
import ButtonGroup from 'components/button-group';
import styles from './countries-context-styles.scss';


const emissionTabs = [
  {
    name: 'EXPLORE BY INDICATOR',
    value: 'EXPLORE_BY_INDICATOR',
    disabled: true
  },
  {
    name: 'EXPLORE BY COUNTRY',
    value: 'EXPLORE_BY_COUNTRY',
    disabled: false
  }
];

const buttonGroupConfig = [
  {
    type: 'info',
    onClick: () => {}
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

const charts = [
  {
    text: 'Agriculture makes up a significant proportion of the total economic output of many countries, especially developing ones. ',
    title: 'GDP indicators'
  },
  {
    text: 'There were 21 million people (10.5% of the population) employed in Brazil\'s Agriculture sector in 2011, of which 10.7% were female.',
    title: 'Socio-economic indicators'
  },
  {
    text: 'In Brazil in 2011, 73% of total water withdrawn was employed in agricultural activities.',
    title: 'Water withdrawal and water stress'
  },
  {
    text: 'The use of synthetic nitrogen fertilizer is a large contributor to emissions in agriculture, owing to the potent greenhouse gas N2O. Heavy pesticide use can lead to harmful impacts on the environment.',
    title: 'Fertilizer and pesticide use'
  },
  {
    text: 'Share of different types of agricultural land as a percentage of total land area in a country. Depending on agricultural intensity, countries devote a different amount of land to agriculture. ',
    title: 'Share in Land Area'
  }
];

const Timeline = ({ years, yearSelected }) => (
  <div className={styles.timelineWrapper}>
    <p className={styles.label}>Year</p>
    <div className={styles.dataContainer}>
      <div className={styles.timelineContainer}>
        <div className={styles.track}>
          <div className={styles.marker} />
        </div>
      </div>
      <div className={styles.yearsContainer}>
        {
          years.map(year => (
            <span
              className={cx(
                styles.year,
                { [styles.yearSelected]: year === yearSelected }
              )}
            >
              {year}
            </span>
          ))
        }
      </div>
    </div>
  </div>
);

class CountriesContext extends PureComponent {
  render() {
    const {
      countries
    } = this.props;
    return (
      <div className={styles.container}>
        <div>
          <h2 className={styles.header}>CountriesContext</h2>
          <div className={styles.intro}>
            <p className={styles.introText}>
              The agricultural sector differs vastly among countries and affects jobs, economy, land-use, water and food security.
              Explore key indicators of progress over time below.
            </p>
            <div className={styles.switchWrapper}>
              <Switch
                options={emissionTabs}
                selectedOption={emissionTabs[1].value}
                onClick={() => {}}
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
              <Dropdown
                label={'Country'}
                value={{ label: 'galicia', value: 'ga' }}
                options={[{ label: 'galicia', value: 'ga' }]}
                onValueChange={() => {}}
              />
            </div>
            <div className={styles.timelineWrapper}>
              <Timeline
                years={['2009', '2010', '2011', '2012', '2013', '2014']}
                yearSelected={'2012'}
              />
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
          {
            charts.map(c => (
              <Card key={c.title} title={c.title} >
                {c.text}
              </Card>
            ))
          }
        </div>
        <CountriesProvider />
        <AgricultureCountriesContextProvider country={70} year={2012} />
      </div>
    );
  }
}

// CountriesContext.propTypes = {
//   handleTabChange: PropTypes.func.isRequired,
//   emissionTabs: PropTypes.array.isRequired,
//   activeTab: PropTypes.string.isRequired
// };

export default CountriesContext;
