import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import BackButton from 'components/back-button';
import Dropdown from 'components/dropdown';
import NdcCompareAllTargetsProvider from 'providers/ndc-compare-all-targets-provider/ndc-compare-all-targets';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';

import layout from 'styles/layout.scss';
import styles from './custom-compare-styles.scss';

const tempOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' }
];

const FiltersGroup = ({ index, selectedCountry, selectedDocument, countryOptions, documentOptions, handleCountryChange }) => (
  <div className={styles.filter}>
    <Dropdown
      key={`${index}-country`}
      label=""
      options={countryOptions}
      onValueChange={({ value }) => {
        // console.log('new params:',{ name: data.key, value })
        handleCountryChange({ name: data.key, value });
      }}
      value={selectedCountry}
      hideResetButton
      theme={{ dropdown: styles.dropdown }}
      className={styles.dropdown}
    />
    <Dropdown
      key={`${index}-document`}
      label=""
      options={documentOptions}
      onValueChange={() => {}}
      value={selectedDocument}
      hideResetButton
    />
  </div>
);

FiltersGroup.propTypes = {
  index: PropTypes.string.isRequired,
  countryOptions: PropTypes.array,
  data: PropTypes.object,
  handleCountryChange: PropTypes.func
};

const CustomComparisonComponent = props => {
  const {
    route,
    anchorLinks,
    countryOptions,
    handleCountryChange,
    filtersData
  } = props;
  return (
    <div>
      <Header route={route}>
        <div className={cx(layout.content, styles.header)}>
          <BackButton
            pathname="/compare-all-targets"
            backLabel="compare all targets"
          />
          <div className={styles.title}>
            <Intro title="Custom comparison" />
          </div>
        </div>
        <Sticky activeClass="sticky -compare" top="#navBarMobile">
          <AnchorNav
            useRoutes
            links={anchorLinks}
            className={styles.anchorNav}
            theme={anchorNavRegularTheme}
          />
        </Sticky>
      </Header>
      <div className={styles.filtersWrapper}>
        <div className={styles.content}>
          <div className={styles.filters}>
            {filtersData &&
              filtersData.map(({ index, selectedCountry, selectedDocument, documentOptions }) => (
                <FiltersGroup
                  key={`filters-group-${index}`}
                  selectedCountry={selectedCountry}
                  selectedDocument={selectedDocument}
                  countryOptions={countryOptions}
                  documentOptions={documentOptions}
                  // documentOptions={filtersData}
                  handleCountryChange={handleCountryChange}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.accordions}>CONTENT HERE</div>
      </div>
      <NdcCompareAllTargetsProvider />
    </div>
  );
};

CustomComparisonComponent.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array,
  filtersSelected: PropTypes.array,
  countryOptions: PropTypes.array,
  handleCountryChange: PropTypes.func
};

export default CustomComparisonComponent;
