import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Chart from 'components/charts/chart';

import styles from './country-ghg-emissions-styles.scss';

class CountryGhgEmissions extends PureComponent {
  render() {
    const {
      data,
      quantifications,
      loading,
      config,
      iso,
      sources,
      calculations,
      handleInfoClick,
      handleYearHover,
      handleSourceChange,
      handleCalculationChange,
      calculationSelected,
      sourceSelected,
      filtersOptions,
      filtersSelected
    } = this.props;
    const useLineChart =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value ||
      calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value;
    return (
      <div className={styles.grid}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            Greenhouse Gas Emissions and Emissions Targets
          </h3>
          <div className={styles.graphControls}>
            <Dropdown
              label="Data Source"
              options={sources}
              onValueChange={handleSourceChange}
              value={sourceSelected}
              hideResetButton
            />
            <Dropdown
              label="Metric"
              options={calculations}
              onValueChange={handleCalculationChange}
              value={calculationSelected}
              hideResetButton
            />
            <ButtonGroup
              className={styles.btnGroup}
              onInfoClick={handleInfoClick}
              widgetId="ghg-emissions"
            />
            <Button
              noSpace
              className={styles.exploreBtn}
              color="yellow"
              link={`/ghg-emissions?breakBy=location&filter=${iso}`}
            >
              Explore emissions
            </Button>
          </div>
        </div>
        <Chart
          className={styles.graph}
          type={useLineChart ? 'line' : 'area'}
          config={config}
          data={data}
          onMouseMove={handleYearHover}
          points={quantifications}
          dataOptions={filtersOptions}
          dataSelected={filtersSelected}
          loading={loading}
          height={320}
        />
      </div>
    );
  }
}

CountryGhgEmissions.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  quantifications: PropTypes.array.isRequired,
  calculations: PropTypes.array.isRequired,
  calculationSelected: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  filtersOptions: PropTypes.array,
  filtersSelected: PropTypes.array,
  handleInfoClick: PropTypes.func.isRequired,
  handleYearHover: PropTypes.func.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  handleCalculationChange: PropTypes.func.isRequired
};

CountryGhgEmissions.defaultProps = {
  iso: ''
};

export default CountryGhgEmissions;
