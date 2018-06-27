import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataExplorerProvider from 'providers/data-explorer-provider/data-explorer-provider';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import Table from 'components/table';
import Dropdown from 'components/dropdown';
import MultiDropdown from 'components/dropdown/multi-dropdown';
import MetadataText from 'components/metadata-text';
import AnchorNav from 'components/anchor-nav';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import Button from 'components/button';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import { toStartCase } from 'app/utils';
import styles from './data-explorer-content-styles.scss';

class DataExplorerContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderTable() {
    const { data, firstColumnHeaders, loading } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return data ? (
      <Table
        data={data}
        rowHeight={60}
        sortBy={'region'}
        firstColumnHeaders={firstColumnHeaders}
        horizontalScroll
      />
    ) : (
      <NoContent message={'No data'} className={styles.noData} />
    );
  }

  renderMeta() {
    const { meta, loadingMeta } = this.props;
    if (loadingMeta) return <Loading light className={styles.loader} />;
    return meta ? (
      <MetadataText className={styles.metadataText} data={meta} />
    ) : (
      <NoContent message={'Select a source'} className={styles.noData} />
    );
  }

  renderFilters() {
    const {
      handleFilterChange,
      selectedOptions,
      filterOptions,
      filters,
      loading,
      loadingMeta,
      section,
      metadataSection
    } = this.props;
    const disabled =
      (!metadataSection && loading) || (metadataSection && loadingMeta);
    const parseGroups = options => {
      const groupParents = [];
      const finalOptions = options
        .map(option => {
          let updatedOption = option;
          if (!option.parent_id) {
            updatedOption = {
              groupParent: option.name,
              value: option.value,
              label: option.label
            };
            groupParents.push({ parentId: option.id, name: option.name });
          }
          return updatedOption;
        })
        .map(option => {
          let updatedOption = option;
          if (option.parent_id) {
            updatedOption = {
              group: groupParents.find(o => option.parent_id === o.parentId)
                .name,
              value: option.value,
              label: option.label
            };
          }
          return updatedOption;
        });
      return finalOptions;
    };
    return filters.map(
      field =>
        (section === 'ndc-content' && field === 'sectors' ? (
          <MultiDropdown
            key={field}
            label={toStartCase(field)}
            placeholder={`Filter by ${toStartCase(field)}`}
            options={filterOptions ? parseGroups(filterOptions[field]) : []}
            value={selectedOptions ? selectedOptions[field] : null}
            disabled={disabled}
            onChange={option =>
              handleFilterChange(
                field,
                option && (option.label || option.slug)
              )}
          />
        ) : (
          <Dropdown
            key={field}
            label={toStartCase(field)}
            placeholder={`Filter by ${toStartCase(field)}`}
            options={filterOptions ? filterOptions[field] : []}
            onValueChange={selected =>
              handleFilterChange(field, selected && selected.slug)}
            value={selectedOptions ? selectedOptions[field] : null}
            plain
            disabled={disabled}
            noAutoSort={field === 'goals' || field === 'targets'}
          />
        ))
    );
  }

  render() {
    const {
      section,
      href,
      downloadHref,
      metadataSection,
      anchorLinks,
      filterQuery,
      query
    } = this.props;
    return (
      <div>
        <DataExplorerProvider section={section} query={filterQuery} />
        <RegionsProvider />
        <CountriesProvider />
        <div className={styles.filtersContainer}>{this.renderFilters()}</div>
        <AnchorNav
          links={anchorLinks}
          theme={anchorNavLightTheme}
          query={query}
        />
        <div className={styles.tableContainer}>
          {metadataSection ? this.renderMeta() : this.renderTable()}
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button} href={href} color="plain">
            View in module page
          </Button>
          <Button className={styles.button} href={downloadHref} color="yellow">
            Download
          </Button>
        </div>
      </div>
    );
  }
}

DataExplorerContent.propTypes = {
  section: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.array,
  selectedOptions: PropTypes.object,
  filterOptions: PropTypes.object,
  metadataSection: PropTypes.bool,
  data: PropTypes.array,
  meta: PropTypes.object,
  firstColumnHeaders: PropTypes.array,
  loading: PropTypes.bool,
  loadingMeta: PropTypes.bool,
  href: PropTypes.string,
  downloadHref: PropTypes.string,
  anchorLinks: PropTypes.array,
  filterQuery: PropTypes.string,
  query: PropTypes.string
};

export default DataExplorerContent;
