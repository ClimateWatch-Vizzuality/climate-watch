import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';
import cx from 'classnames';
import compareSubmittedIcon from 'assets/icons/compare-submitted.svg';
import compareNotSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import compareTableTheme from 'styles/themes/table/compare-table-theme.scss';
import { DOCUMENTS_NAME_SLUG } from 'data/country-documents';

import styles from './ndc-compare-all-targets-table-styles.scss';

const cellRenderer = (cell, selectedTargets, columns, setSelectedTargets) => {
  const { cellData, dataKey, columnIndex, rowData } = cell;
  const id = `${rowData.Country.iso}-${DOCUMENTS_NAME_SLUG[dataKey]}`;
  const isActive = selectedTargets.includes(id);
  const isLastColumn = columnIndex === columns.length - 1;

  const canSelect = selectedTargets.length < 3;
  const addSelectedTarget = target => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(t => t !== target));
    } else if (canSelect) {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  if (dataKey === 'Country') {
    return <Link to={`/ndcs/country/${cellData.iso}`}>{cellData.name}</Link>;
  }
  if (dataKey === 'Share of global GHG emissions') {
    return cellData;
  }
  if (cellData === 'yes') {
    return (
      <Button
        onClick={() => addSelectedTarget(id)}
        className={cx(
          styles.iconButton,
          { [styles.clickable]: isActive || canSelect },
          { [styles.lastColumn]: isLastColumn },
          { [styles.active]: isActive }
        )}
        disabled={!isActive && !canSelect}
      >
        <Icon icon={compareSubmittedIcon} className={styles.submitIcon} />
      </Button>
    );
  }
  return (
    <button
      className={cx(styles.iconButton, { [styles.lastColumn]: isLastColumn })}
    >
      <Icon icon={compareNotSubmittedIcon} className={styles.submitIcon} />
    </button>
  );
};

const CompareAllTable = ({
  loading,
  tableData,
  setColumnWidth,
  columns,
  noContentMsg,
  selectedTargets,
  setSelectedTargets
}) => (
  <div>
    {loading && (
      <div className={styles.loaderWrapper}>
        <Loading light />
      </div>
    )}
    {!loading && tableData && tableData.length > 0 && (
      <Table
        data={tableData}
        tableHeight={550}
        horizontalScroll
        parseHtml
        dynamicRowsHeight
        setColumnWidth={setColumnWidth}
        defaultColumns={columns}
        theme={compareTableTheme}
        customCellRenderer={cell =>
          cellRenderer(cell, selectedTargets, columns, setSelectedTargets)
        }
      />
    )}
    {!loading && (!tableData || tableData.length <= 0) && (
      <NoContent className={styles.noContent} message={noContentMsg} />
    )}
  </div>
);

CompareAllTable.propTypes = {
  loading: PropTypes.bool,
  tableData: PropTypes.array,
  noContentMsg: PropTypes.string,
  columns: PropTypes.array,
  setColumnWidth: PropTypes.func.isRequired,
  selectedTargets: PropTypes.array,
  setSelectedTargets: PropTypes.func.isRequired
};

export default CompareAllTable;
