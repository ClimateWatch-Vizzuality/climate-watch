import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import Tag from 'components/tag';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Chart from 'components/charts/chart';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import ModalMetadata from 'components/modal-metadata';
import { isPageContained } from 'utils/navigation';

import quantificationTagTheme from 'styles/themes/tag/quantification-tag.scss';
import styles from './country-ghg-emissions-styles.scss';

class CountryGhgEmissions extends PureComponent {
  renderFilterDropdowns() {
    const {
      sources,
      calculations,
      handleSourceChange,
      handleCalculationChange,
      calculationSelected,
      sourceSelected
    } = this.props;
    return [
      <Dropdown
        key="filter1"
        label="Data Source"
        options={sources}
        onValueChange={handleSourceChange}
        value={sourceSelected}
        hideResetButton
      />,
      <Dropdown
        key="filter2"
        label="Metric"
        options={calculations}
        onValueChange={handleCalculationChange}
        value={calculationSelected}
        hideResetButton
      />
    ];
  }

  renderActionButtons() {
    const {
      iso,
      handleInfoClick,
      handleAnalyticsClick,
      isEmbed,
      isNdcp
    } = this.props;

    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : [
        {
          type: 'info',
          onClick: handleInfoClick
        },
        {
          type: 'share',
          shareUrl: `/embed/countries/${iso}/ghg-emissions`,
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

    const link = `/ghg-emissions?breakBy=regions-${CALCULATION_OPTIONS.ABSOLUTE_VALUE.value}&regions=${iso}`;
    const href = `/contained${link}&isNdcp=true`;

    return [
      <ButtonGroup
        key="action1"
        className={styles.btnGroup}
        buttonsConfig={buttonGroupConfig}
      />,
      <Button
        key="action2"
        className={styles.exploreBtn}
        variant="primary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
      >
        Explore Emissions
      </Button>
    ];
  }

  renderChart() {
    const {
      calculationSelected,
      data,
      domain,
      quantifications,
      loading,
      config,
      handleYearHover,
      filtersOptions,
      filtersSelected,
      sourceSelected
    } = this.props;

    const points = !isPageContained ? quantifications : [];
    const useLineChart =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value ||
      calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value;
    const forceFixedFormatDecimals =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value
        ? 2
        : 0;

    return (
      <Chart
        className={styles.graph}
        type={useLineChart ? 'line' : 'area'}
        config={config}
        data={data}
        domain={useLineChart && domain}
        onMouseMove={handleYearHover}
        points={points}
        dataOptions={filtersOptions}
        dataSelected={filtersSelected}
        loading={loading}
        height={360}
        forceFixedFormatDecimals={forceFixedFormatDecimals}
        stepped={sourceSelected.label === 'UNFCCC'}
      />
    );
  }

  renderQuantificationsTags() {
    const { loading, quantificationsTagsConfig } = this.props;
    return (
      <ul>
        {!loading &&
          !isPageContained &&
          quantificationsTagsConfig.map(q => (
            <Tag
              theme={quantificationTagTheme}
              key={q.label}
              canRemove={false}
              label={q.label}
              color={q.color}
              data={q}
              className={styles.quantificationsTags}
            />
          ))}
      </ul>
    );
  }

  render() {
    const { isEmbed, countryName } = this.props;
    return (
      <div className={styles.container}>
        <EmissionsMetaProvider />
        <WbCountryDataProvider />
        <h3 className={styles.title}>
          {`Greenhouse Gas Emissions and Emissions Targets ${
            isEmbed ? `in ${countryName}` : ''
          }`}
        </h3>
        <TabletLandscape>
          <div
            className={cx(styles.graphControls, {
              [styles.graphControlsEmbed]: isEmbed
            })}
          >
            {this.renderFilterDropdowns()}
            {this.renderActionButtons()}
          </div>
          {this.renderChart()}
          {this.renderQuantificationsTags()}
        </TabletLandscape>
        <TabletPortraitOnly>
          <div className={styles.graphControlsSection}>
            {this.renderFilterDropdowns()}
          </div>
          {this.renderChart()}
          {this.renderQuantificationsTags()}
          <div className={styles.graphControlsSection}>
            {this.renderActionButtons()}
          </div>
        </TabletPortraitOnly>
        <ModalMetadata />
      </div>
    );
  }
}

CountryGhgEmissions.propTypes = {
  isEmbed: PropTypes.bool,
  isNdcp: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  domain: PropTypes.object,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  quantifications: PropTypes.array.isRequired,
  quantificationsTagsConfig: PropTypes.array.isRequired,
  calculations: PropTypes.array.isRequired,
  calculationSelected: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  filtersOptions: PropTypes.array,
  filtersSelected: PropTypes.array,
  handleInfoClick: PropTypes.func.isRequired,
  handleAnalyticsClick: PropTypes.func.isRequired,
  handleYearHover: PropTypes.func,
  handleSourceChange: PropTypes.func.isRequired,
  handleCalculationChange: PropTypes.func.isRequired
};

CountryGhgEmissions.defaultProps = {
  iso: ''
};

export default CountryGhgEmissions;
