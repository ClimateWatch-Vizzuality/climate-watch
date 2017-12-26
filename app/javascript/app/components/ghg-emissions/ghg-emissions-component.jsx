import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import RegionsProvider from 'providers/regions-provider';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import MultiSelect from 'components/multiselect';
import Chart from 'components/charts/chart';
import ModalMetadata from 'components/modal-metadata';

import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      data,
      config,
      groups,
      sources,
      sourceSelected,
      handleSourceChange,
      handleInfoClick,
      versions,
      versionSelected,
      handleVersionChange,
      breaksBy,
      breakSelected,
      handleBreakByChange,
      filters,
      filtersSelected,
      handleFilterChange,
      loading,
      activeFilterRegion
    } = this.props;
    return (
      <div>
        <h2 className={styles.title}>Global Historical Emissions</h2>
        <RegionsProvider />
        <EmissionsMetaProvider />
        <div className={styles.col4}>
          <Dropdown
            label="Source"
            options={sources}
            onValueChange={handleSourceChange}
            value={sourceSelected}
            hideResetButton
          />
          <Dropdown
            label="IPCC Version"
            options={versions}
            onValueChange={handleVersionChange}
            value={versionSelected}
            hideResetButton
            disabled={versions && versions.length === 1}
          />
          <Dropdown
            label="Break by"
            options={breaksBy}
            onValueChange={handleBreakByChange}
            value={breakSelected}
            hideResetButton
          />
          <MultiSelect
            selectedLabel={activeFilterRegion ? activeFilterRegion.label : null}
            label={breakSelected.label}
            groups={breakSelected.value === 'location' ? groups : null}
            values={filtersSelected || []}
            options={filters || []}
            onMultiValueChange={handleFilterChange}
          />
          <ButtonGroup
            className={styles.colEnd}
            onInfoClick={handleInfoClick}
            shareUrl="/embed/ghg-emissions"
          />
        </div>
        <Chart
          className={styles.chartWrapper}
          type="line"
          config={config}
          data={data}
          dataOptions={filters}
          dataSelected={filtersSelected}
          height={500}
          loading={loading}
        />
        <ModalMetadata />
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  groups: PropTypes.array,
  versions: PropTypes.array,
  versionSelected: PropTypes.object,
  handleVersionChange: PropTypes.func.isRequired,
  sources: PropTypes.array,
  sourceSelected: PropTypes.object,
  handleInfoClick: PropTypes.func.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  breaksBy: PropTypes.array,
  breakSelected: PropTypes.object,
  handleBreakByChange: PropTypes.func.isRequired,
  filters: PropTypes.array,
  filtersSelected: PropTypes.array,
  handleFilterChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  activeFilterRegion: PropTypes.object
};

export default GhgEmissions;
