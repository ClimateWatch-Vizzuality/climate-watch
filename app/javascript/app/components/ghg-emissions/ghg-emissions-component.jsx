import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RegionsProvider from 'providers/regions-provider';
import ChartLine from 'components/charts/line';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Tag from 'components/tag';
import MultiSelect from 'components/multiselect';

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
      versions,
      versionSelected,
      handleVersionChange,
      breaksBy,
      breakSelected,
      handleBreakByChange,
      filters,
      filtersSelected,
      handleFilterChange,
      handleRemoveTag
    } = this.props;
    return (
      <div>
        <h2 className={styles.title}>Global Historical Emissions</h2>
        <RegionsProvider />
        <div className={styles.col4}>
          <Dropdown
            label="Source"
            options={sources}
            onChange={handleSourceChange}
            value={sourceSelected}
            clearable={false}
          />
          <Dropdown
            label="IPCC Version"
            options={versions}
            onChange={handleVersionChange}
            value={versionSelected}
            clearable={false}
            disabled={versions.length === 1}
          />
          <Dropdown
            label="BreakBy"
            options={breaksBy}
            onChange={handleBreakByChange}
            value={breakSelected}
            clearable={false}
          />
          <MultiSelect
            groups={breakSelected.value === 'location' ? groups : null}
            groupsAsColumns
            placeholderText={`Select ${breakSelected.value}s`}
            values={filtersSelected}
            options={filters}
            onMultiValueChange={handleFilterChange}
            selectedClassName={styles.selected}
          />
          <ButtonGroup className={styles.colEnd} />
        </div>
        <ChartLine config={config} data={data} />
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
                onRemove={handleRemoveTag}
              />
            ))}
        </div>
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  versions: PropTypes.array.isRequired,
  versionSelected: PropTypes.object.isRequired,
  handleVersionChange: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  breaksBy: PropTypes.array.isRequired,
  breakSelected: PropTypes.object.isRequired,
  handleBreakByChange: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  filtersSelected: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default GhgEmissions;
