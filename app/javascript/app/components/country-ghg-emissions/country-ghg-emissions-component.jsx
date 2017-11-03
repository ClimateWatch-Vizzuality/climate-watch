import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import ChartStackedArea from 'components/charts/stacked-area';
import LineChart from 'components/charts/line';
import Tag from 'components/tag';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Loading from 'components/loading';

import styles from './country-ghg-emissions-styles.scss';

class CountryGhgEmissions extends PureComponent {
  render() {
    const {
      data,
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
      sourceSelected
    } = this.props;
    const useLineChart =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value ||
      calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value;
    const ChartComponent = useLineChart ? LineChart : ChartStackedArea;

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
        <div className={styles.graph}>
          {loading && <Loading light className={styles.loader} />}
          {!loading && (
            <ChartComponent
              config={config}
              data={data}
              height="100%"
              onMouseMove={handleYearHover}
            />
          )}
        </div>
        <div className={styles.tags}>
          {config.columns &&
            config.columns.y.map(column => (
              <Tag
                className={styles.tag}
                key={`${column.value}`}
                data={{
                  color: config.theme[column.value].stroke,
                  label: column.label,
                  id: column.value
                }}
              />
            ))}
        </div>
      </div>
    );
  }
}

CountryGhgEmissions.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  calculations: PropTypes.array.isRequired,
  calculationSelected: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleYearHover: PropTypes.func.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  handleCalculationChange: PropTypes.func.isRequired
};

CountryGhgEmissions.defaultProps = {
  iso: ''
};

export default CountryGhgEmissions;
