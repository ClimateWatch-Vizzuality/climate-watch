import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Chart from 'components/charts/chart';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import ModalMetadata from 'components/modal-metadata';
import Disclaimer from 'components/disclaimer';
import { isPageContained } from 'utils/navigation';

import styles from './country-ghg-emissions-styles.scss';

const { FEATURE_QUANTIFICATIONS } = process.env;

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
    const { iso, handleInfoClick, handleAnalyticsClick, isEmbed } = this.props;

    return [
      <ButtonGroup
        key="action1"
        className={styles.btnGroup}
        onInfoClick={handleInfoClick}
        shareUrl={`/embed/countries/${iso}/ghg-emissions`}
        analyticsGraphName="Country/Ghg-emissions"
        reverseDropdown={!isEmbed}
      />,
      <Button
        key="action2"
        noSpace
        className={styles.exploreBtn}
        color="yellow"
        link={`/ghg-emissions?breakBy=location&filter=${iso}`}
        onClick={handleAnalyticsClick}
      >
        Explore emissions
      </Button>
    ];
  }

  renderChart() {
    const {
      calculationSelected,
      data,
      quantifications,
      loading,
      config,
      handleYearHover,
      filtersOptions,
      filtersSelected
    } = this.props;

    const points =
      FEATURE_QUANTIFICATIONS === 'true' && !isPageContained
        ? quantifications
        : [];
    const useLineChart =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value ||
      calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value;

    return (
      <Chart
        className={styles.graph}
        type={useLineChart ? 'line' : 'area'}
        config={config}
        data={data}
        onMouseMove={handleYearHover}
        points={points}
        dataOptions={filtersOptions}
        dataSelected={filtersSelected}
        loading={loading}
        height={360}
      />
    );
  }

  render() {
    const { isEmbed, countryName } = this.props;
    return (
      <div className={styles.container}>
        <EmissionsMetaProvider />
        <WbCountryDataProvider />
        <h3 className={styles.title}>
          {`Greenhouse Gas Emissions and Emissions Targets ${isEmbed
            ? `in ${countryName}`
            : ''}`}
        </h3>
        <TabletLandscape>
          <div className={styles.graphControls}>
            {this.renderFilterDropdowns()}
            {this.renderActionButtons()}
          </div>
          {this.renderChart()}
        </TabletLandscape>
        <TabletPortraitOnly>
          <div className={styles.graphControlsSection}>
            {this.renderFilterDropdowns()}
          </div>
          {this.renderChart()}
          <div className={styles.graphControlsSection}>
            {this.renderActionButtons()}
          </div>
        </TabletPortraitOnly>
        <ModalMetadata disclaimer={<Disclaimer onlyText />} />
      </div>
    );
  }
}

CountryGhgEmissions.propTypes = {
  isEmbed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  quantifications: PropTypes.array.isRequired,
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
