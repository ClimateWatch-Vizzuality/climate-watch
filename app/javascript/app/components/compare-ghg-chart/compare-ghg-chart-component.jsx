import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EmissionsProvider from 'providers/emissions-provider/emissions-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import ModalMetadata from 'components/modal-metadata';

import styles from './compare-ghg-chart-styles.scss';

class CompareGhgChart extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderButtonGroup(reverseDropdown) {
    return (
      <ButtonGroup
        className={styles.colEnd}
        onInfoClick={this.props.handleInfoClick}
        shareUrl="/embed/ghg-emissions"
        analyticsGraphName="Ghg-emissions"
        reverseDropdown={reverseDropdown}
      />
    );
  }
  render() {
    const {
      handleSourceChange,
      sourceOptions,
      sourceSelected,
      calculationOptions,
      calculationSelected,
      handleCalculationChange
    } = this.props;
    return (
      <div>
        <EmissionsProvider />
        <EmissionsMetaProvider />
        <div className={styles.col4}>
          <Dropdown
            label="Source"
            options={sourceOptions}
            onValueChange={handleSourceChange}
            value={sourceSelected}
            hideResetButton
          />
          <Dropdown
            label="Calculation"
            options={calculationOptions}
            onValueChange={handleCalculationChange}
            value={calculationSelected}
            hideResetButton
          />
          <TabletLandscape>{this.renderButtonGroup()}</TabletLandscape>
        </div>
        {/* <Chart
          className={styles.chartWrapper}
          type="line"
          config={config}
          data={data}
          dataOptions={filters}
          dataSelected={filtersSelected}
          height={500}
          loading={loading}
        /> */}
        <TabletPortraitOnly>
          <div className={styles.buttonGroup}>
            {this.renderButtonGroup(true)}
          </div>
        </TabletPortraitOnly>
        <ModalMetadata />
      </div>
    );
  }
}

CompareGhgChart.propTypes = {
  sourceOptions: PropTypes.array,
  sourceSelected: PropTypes.object,
  handleSourceChange: PropTypes.func.isRequired,
  calculationOptions: PropTypes.array,
  calculationSelected: PropTypes.object,
  handleCalculationChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired
};

export default CompareGhgChart;
