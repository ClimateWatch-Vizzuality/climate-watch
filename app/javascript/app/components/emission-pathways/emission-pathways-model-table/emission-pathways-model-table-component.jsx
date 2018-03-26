import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import layout from 'styles/layout.scss';
import styles from './emission-pathways-model-table-styles.scss';

class EmissionPathwaysModelTableComponent extends PureComponent {
  getTableContent() {
    const {
      loading,
      data,
      noContentMsg,
      titleLinks,
      defaultColumns,
      fullTextColumns
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    return data && data.length > 0 ? (
      <Table
        titleLinks={titleLinks}
        data={data}
        rowHeight={60}
        sortBy={'name'}
        hasColumnSelect
        fullTextColumns={fullTextColumns}
        defaultColumns={defaultColumns}
        emptyValueLabel={'Not specified'}
        horizontalScroll
      />
    ) : (
      <NoContent message={noContentMsg} />
    );
  }

  render() {
    return <div className={layout.content}>{this.getTableContent()}</div>;
  }
}

EmissionPathwaysModelTableComponent.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  data: PropTypes.array,
  titleLinks: PropTypes.array,
  defaultColumns: PropTypes.array,
  fullTextColumns: PropTypes.array
};

export default EmissionPathwaysModelTableComponent;
