import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Dropdown, Card, Icon, PieChart } from 'cw-components';
import { TabletLandscape } from 'components/responsive';
import ButtonGroup from 'components/button-group';
import infoIcon from 'assets/icons/info';
import LandArea from './land-area';
import MeatData from './meat-data';

import styles from './context-by-country-styles.scss';

const cardTheme = {
  card: styles.card,
  data: styles.cardData,
  contentContainer: styles.titleContainer
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

const ContextByCountryComponent = ({
  cards,
  countries,
  selectedCountry,
  years,
  selectedYear,
  handleInfoBtnClick,
  updateCountryFilter,
  updateCountryYearFilter
}) => (
  <TabletLandscape>
    {isTablet => (
      <React.Fragment>
        <div className={styles.actionsContainer}>
          {countries && (
            <Dropdown
              label={'Country'}
              value={selectedCountry}
              options={countries}
              onValueChange={updateCountryFilter}
              hideResetButton
            />
          )}
          {selectedYear && (
            <Dropdown
              label={'Year'}
              value={selectedYear}
              options={years}
              onValueChange={updateCountryYearFilter}
              hideResetButton
            />
          )}
          <div className={styles.buttonGroupWrapper}>
            <ButtonGroup
              className={styles.btnGroup}
              buttonsConfig={buttonGroupConfig}
            />
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {cards &&
            cards.map(c => (
              <Card key={c.title} title={c.title} theme={cardTheme}>
                <div
                  className={cx(styles.textHtmlWrapper, styles.introText)}
                  dangerouslySetInnerHTML={{ __html: c.text }}
                />
                <div className={styles.cardContent}>
                  <div className={cx(styles.textHtmlWrapper, styles.legend)}>
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
        <LandArea />
        {selectedCountry && selectedYear && <MeatData />}
        {!isTablet && (
          <ButtonGroup
            className={styles.btnGroup}
            buttonsConfig={buttonGroupConfig}
          />
        )}
      </React.Fragment>
    )}
  </TabletLandscape>
);

ContextByCountryComponent.propTypes = {
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
  updateCountryYearFilter: PropTypes.func.isRequired,
  updateCountryFilter: PropTypes.func.isRequired,
  handleInfoBtnClick: PropTypes.func.isRequired
};

export default ContextByCountryComponent;
