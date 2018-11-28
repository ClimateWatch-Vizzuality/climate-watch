import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import RegionsProvider from 'providers/regions-provider';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import MultiSelect from 'components/multiselect';
import { Chart } from 'cw-components';
import ModalMetadata from 'components/modal-metadata';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';

import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      data,
      domain,
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
      providerFilters,
      loading,
      activeFilterRegion,
      downloadLink
    } = this.props;

    const renderButtonGroup = () => (
      <ButtonGroup
        className={styles.colEnd}
        buttonsConfig={[
          {
            type: 'info',
            onClick: handleInfoClick
          },
          {
            type: 'share',
            shareUrl: '/embed/ghg-emissions',
            analyticsGraphName: 'Ghg-emissions',
            positionRight: true
          },
          {
            type: 'download',
            section: 'ghg-emissions',
            link: downloadLink
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    );
    return (
      <div>
        <h2 className={styles.title}>Global Historical Emissions</h2>
        <RegionsProvider />
        <EmissionsMetaProvider />
        <EmissionsProvider filters={providerFilters} />
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
            label="Select by"
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
          <TabletLandscape>{renderButtonGroup()}</TabletLandscape>
        </div>
        <Chart
          // className={styles.chartWrapper}
          type="line"
          // type={
          //   selectedOptions &&
          //     selectedOptions.chartType &&
          //     selectedOptions.chartType.value
          // }

          theme={{ legend: styles.legend }}
          config={config}
          data={data}
          domain={domain}
          dataOptions={filters}
          dataSelected={filtersSelected}
          height={500}
          loading={loading}
          lineType="linear"
          showUnit
          // onLegendChange={v =>
          //   this.handleFilterChange(fieldToBreakBy, v)}
        />
        <TabletPortraitOnly>
          <div className={styles.buttonGroup}>{renderButtonGroup(true)}</div>
        </TabletPortraitOnly>
        <ModalMetadata />
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.object,
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
  providerFilters: PropTypes.object,
  handleBreakByChange: PropTypes.func.isRequired,
  filters: PropTypes.array,
  filtersSelected: PropTypes.array,
  handleFilterChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  activeFilterRegion: PropTypes.object,
  downloadLink: PropTypes.string
};

export default GhgEmissions;
