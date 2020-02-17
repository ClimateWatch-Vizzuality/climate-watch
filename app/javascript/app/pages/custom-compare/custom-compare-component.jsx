import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import BackButton from 'components/back-button';
import Dropdown from 'components/dropdown';
import NdcCompareAllTargetsProvider from 'providers/ndc-compare-all-targets-provider';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';

import layout from 'styles/layout.scss';
import styles from './custom-compare-styles.scss';

const COUNTRY_PLACEHOLDERS = [
  'Add a first country',
  'Add a second country',
  'Add a third country'
];

const FiltersGroup = ({ data, countryPlaceholder, handleFilterChange }) => {
  const {
    countryParam,
    countryValue,
    contriesOptions,
    documentParam,
    documentValue,
    documentOptions
  } = data;

  return (
    <div className={styles.filter}>
      <Dropdown
        key={`${countryParam}-filter`}
        className={styles.dropdown}
        options={contriesOptions}
        onValueChange={({ value }) => handleFilterChange(countryParam, value)}
        value={countryValue}
        placeholder={countryPlaceholder}
        hideResetButton
        noAutoSort
      />
      <Dropdown
        key={`${documentParam}-filter`}
        options={documentOptions}
        onValueChange={({ value }) => handleFilterChange(documentParam, value)}
        value={documentValue}
        placeholder="Choose a submission"
        hideResetButton
        noAutoSort
      />
    </div>
  );
};

const CustomComparisonComponent = props => {
  const { route, anchorLinks, handleFilterChange, filtersData } = props;
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
              filtersData.map((data, i) => (
                <FiltersGroup
                  key={data.key}
                  data={data}
                  countryPlaceholder={COUNTRY_PLACEHOLDERS[i]}
                  handleFilterChange={handleFilterChange}
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

FiltersGroup.propTypes = {
  data: PropTypes.shape({
    countryParam: PropTypes.string,
    countryValue: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    contriesOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    documentParam: PropTypes.string,
    documentValue: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    documentOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    )
  }),
  countryPlaceholder: PropTypes.string,
  handleFilterChange: PropTypes.func
};

CustomComparisonComponent.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array,
  filtersData: PropTypes.array,
  handleFilterChange: PropTypes.func
};

export default CustomComparisonComponent;
