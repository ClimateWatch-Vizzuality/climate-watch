import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
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

const FiltersGroup = ({
  data,
  countryPlaceholder,
  handleCountryFilterChange,
  handleDocumentFilterChange
}) => {
  const {
    key,
    countryValue,
    contriesOptions,
    documentValue,
    documentOptions
  } = data;

  return (
    <div className={styles.filter}>
      <Dropdown
        key={`${key}-country`}
        className={styles.dropdown}
        options={contriesOptions}
        onValueChange={({ value }) => handleCountryFilterChange(key, value)}
        value={countryValue}
        placeholder={countryPlaceholder}
        hideResetButton
        noAutoSort
      />
      <Dropdown
        key={`${key}-document`}
        options={documentOptions}
        onValueChange={({ value }) => handleDocumentFilterChange(key, value)}
        value={documentValue}
        placeholder="Choose a submission"
        hideResetButton
        noAutoSort
      />
    </div>
  );
};

const CustomComparisonComponent = props => {
  const {
    route,
    anchorLinks,
    handleCountryFilterChange,
    handleDocumentFilterChange,
    filtersData,
    backButtonLink
  } = props;
  return (
    <div>
      <Header route={route}>
        <div className={cx(layout.content, styles.header)}>
          <BackButton
            pathname={backButtonLink}
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
      <div className={styles.content}>
        <div className={styles.filters}>
          {filtersData &&
            filtersData.map((data, i) => (
              <FiltersGroup
                key={data.key}
                data={data}
                countryPlaceholder={COUNTRY_PLACEHOLDERS[i]}
                handleCountryFilterChange={handleCountryFilterChange}
                handleDocumentFilterChange={handleDocumentFilterChange}
              />
            ))}
        </div>
      </div>
      {renderRoutes(route.routes)}
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
  handleCountryFilterChange: PropTypes.func,
  handleDocumentFilterChange: PropTypes.func
};

CustomComparisonComponent.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array,
  filtersData: PropTypes.array,
  handleCountryFilterChange: PropTypes.func,
  handleDocumentFilterChange: PropTypes.func,
  backButtonLink: PropTypes.string
};

export default CustomComparisonComponent;
