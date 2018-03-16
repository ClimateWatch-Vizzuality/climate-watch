import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Search from 'components/search';
import Loading from 'components/loading';
import Dropdown from 'components/dropdown';
import darkSearch from 'styles/themes/search/search-dark.scss';
import layout from 'styles/layout.scss';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import startCase from 'lodash/startCase';
import { FILTERS_BY_CATEGORY } from 'data/constants';
import Collapse from 'components/collapse';
import { TabletLandscape } from 'components/responsive';
import cx from 'classnames';
import styles from './emission-pathways-table-styles.scss';

class EmissionPathwaysTable extends PureComponent {
  constructor() {
    super();
    this.state = {
      contentRef: null
    };
  }
  renderTableContent() {
    const {
      loading,
      data,
      noContentMsg,
      defaultColumns,
      titleLinks,
      fullTextColumns
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return data && data.length > 0 ? (
      <Table
        data={data}
        titleLinks={titleLinks}
        hasColumnSelect
        defaultColumns={defaultColumns}
        fullTextColumns={fullTextColumns}
        emptyValueLabel={'Not specified'}
      />
    ) : (
      <NoContent className={styles.noContent} message={noContentMsg} icon />
    );
  }

  renderFilters() {
    const {
      categoryName,
      handleFilterChange,
      selectedFields,
      filterOptions
    } = this.props;
    const category = categoryName.toLowerCase();
    return FILTERS_BY_CATEGORY[category].map(field => (
      <Dropdown
        key={field}
        label={startCase(field)}
        placeholder={`Filter by ${startCase(field)}`}
        options={filterOptions ? filterOptions[field] : []}
        onValueChange={selected =>
          handleFilterChange(field, categoryName, selected && selected.value)}
        value={selectedFields ? selectedFields[field] : null}
        plain
      />
    ));
  }

  render() {
    const { query, handleSearchChange, categoryName } = this.props;
    return (
      <TabletLandscape>
        {landscape => (
          <div className={layout.content}>
            <EspModelsProvider />
            <EspScenariosProvider />
            <EspIndicatorsProvider />
            <div className="grid-column-item">
              <div className={styles.filtersLayout}>
                <div className="grid-column-item">
                  <div className={styles.filters}>
                    {landscape ? (
                      this.renderFilters()
                    ) : (
                      <Collapse
                        contentRef={this.state.contentRef}
                        contentClassName={cx(styles.col2)}
                      >
                        {this.renderFilters()}
                      </Collapse>
                    )}
                  </div>
                </div>
                <div className="grid-column-item">
                  <div className={styles.searchLayout}>
                    <Search
                      input={query}
                      theme={darkSearch}
                      onChange={handleSearchChange}
                      placeholder={`Search in ${categoryName}`}
                      plain
                    />
                  </div>
                </div>
              </div>
              {!landscape && (
                <div
                  ref={c => {
                    this.setState({ contentRef: c });
                  }}
                />
              )}
              {this.renderTableContent()}
            </div>
          </div>
        )}
      </TabletLandscape>
    );
  }
}

EmissionPathwaysTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  data: PropTypes.array,
  defaultColumns: PropTypes.array,
  fullTextColumns: PropTypes.array,
  categoryName: PropTypes.string.isRequired,
  titleLinks: PropTypes.array,
  query: PropTypes.string,
  handleSearchChange: PropTypes.func,
  handleFilterChange: PropTypes.func,
  selectedFields: PropTypes.object,
  filterOptions: PropTypes.object
};

export default EmissionPathwaysTable;
