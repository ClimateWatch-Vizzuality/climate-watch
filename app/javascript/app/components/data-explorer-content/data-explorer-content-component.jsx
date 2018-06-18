import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataExplorerProvider from 'providers/data-explorer-provider/data-explorer-provider';
import Table from 'components/table';
import MetadataText from 'components/metadata-text';
import AnchorNav from 'components/anchor-nav';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import Button from 'components/button';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import styles from './data-explorer-content-styles.scss';

const noData = <NoContent message={'No data'} className={styles.noData} />;
class DataExplorerContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderContent() {
    const { metadataSection } = this.props;
    return metadataSection ? this.renderMeta() : this.renderTable();
  }

  renderTable() {
    const { data, firstColumnHeaders } = this.props;
    return data ? (
      <Table
        data={data}
        rowHeight={60}
        sortBy={'region'}
        firstColumnHeaders={firstColumnHeaders}
        horizontalScroll
      />
    ) : (
      noData
    );
  }

  renderMeta() {
    const { meta } = this.props;
    return meta ? (
      <MetadataText className={styles.metadataText} data={meta} />
    ) : (
      noData
    );
  }

  render() {
    const { section, loading, href, downloadHref } = this.props;
    return (
      <div>
        <DataExplorerProvider section={section} />
        <AnchorNav
          links={[
            { label: 'Raw Data', hash: 'data' },
            { label: 'Methodology', hash: 'meta' }
          ]}
          theme={anchorNavLightTheme}
        />
        <div className={styles.tableContainer}>
          {loading ? (
            <Loading light className={styles.loader} />
          ) : (
            this.renderContent()
          )}
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
  metadataSection: PropTypes.bool,
  data: PropTypes.array,
  meta: PropTypes.object,
  firstColumnHeaders: PropTypes.array,
  loading: PropTypes.bool,
  href: PropTypes.string,
  downloadHref: PropTypes.string
};

export default DataExplorerContent;
