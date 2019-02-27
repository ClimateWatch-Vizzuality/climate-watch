import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Dropdown } from 'cw-components';
import { TabletLandscape } from 'components/responsive';
import ButtonGroup from 'components/button-group';
import NoContent from 'components/no-content';
import IndicatorCards from './indicator-card';
import LandArea from './land-area';
import MeatData from './meat-data';

import styles from './context-by-country-styles.scss';

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
  // handleInfoBtnClick,
  updateCountryFilter,
  updateCountryYearFilter
}) => (
  <TabletLandscape>
    {isTablet => (
      <React.Fragment>
        <div className={styles.actionsContainer}>
          <div className={styles.filtersGroup}>
            {countries && (
              <Dropdown
                label={'Country'}
                value={selectedCountry}
                options={countries}
                onValueChange={updateCountryFilter}
                hideResetButton
              />
            )}
            {!isEmpty(years) &&
             selectedYear && (
               <Dropdown
                 label={'Year'}
                 value={selectedYear}
                 options={years}
                 onValueChange={updateCountryYearFilter}
                 hideResetButton
               />
             )}
          </div>
          {isTablet && (
            <ButtonGroup className={styles.btnGroup} buttonsConfig={buttonGroupConfig} />
          )}
        </div>
        {!isEmpty(years) ? (
          <div>
            {selectedCountry &&
             selectedYear && (
               <React.Fragment>
                 <IndicatorCards selectedYear={selectedYear} cards={cards} />
                 <LandArea />
                 <MeatData />
               </React.Fragment>
            )}
          </div>
        ) : (
          <NoContent
            message={`No data for ${selectedCountry.label}, please select another country`}
            className={styles.noContent}
            minHeight={300}
          />
        )}
        {!isTablet && <ButtonGroup className={styles.btnGroup} buttonsConfig={buttonGroupConfig} />}
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
  updateCountryFilter: PropTypes.func.isRequired
  // handleInfoBtnClick: PropTypes.func.isRequired
};

export default ContextByCountryComponent;
