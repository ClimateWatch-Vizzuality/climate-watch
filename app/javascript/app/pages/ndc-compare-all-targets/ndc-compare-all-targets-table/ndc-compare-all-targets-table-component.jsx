import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import compareSubmittedIcon from 'assets/icons/compare-submitted.svg';
import compareNotSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import compareIntendsIcon from 'assets/icons/compare-intends.svg';
import { Table } from 'cw-components';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import compareTableTheme from 'styles/themes/table/compare-table-theme.scss';
import { DOCUMENT_COLUMNS_SLUGS } from 'data/country-documents';
import { SUBMISSION_ICON_VALUE } from 'pages/ndc-compare-all-targets/ndc-compare-all-targets-selectors';
import styles from './ndc-compare-all-targets-table-styles.scss';

const cellRenderer = (
  cell,
  selectedTargets = [],
  columns,
  setSelectedTargets,
  titleLinks,
  countryIsos
) => {
  const { cellData, dataKey, columnIndex, rowData } = cell;
  const iso = countryIsos && countryIsos[rowData.Country];
  const id = `${iso}-${DOCUMENT_COLUMNS_SLUGS[dataKey]}`;
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
    // TODO: We are using value to find the titleLink as the sorting was not working correctly
    // We could use the rowIndex as in the default table
    const titleLink = titleLinks.find(t => t[0] && t[0].value === cellData);
    if (titleLink) {
      const href = titleLink[0].url;
      return (
        <a title={`NDC page for ${cellData}`} href={href}>
          {cellData}
        </a>
      );
    }
  }

  if (dataKey === 'Share of global GHG emissions') {
    return cellData;
  }

  switch (cellData) {
    case SUBMISSION_ICON_VALUE.yes: {
      const isDisabled = !isActive && !canSelect;
      return (
        <Button
          onClick={() => addSelectedTarget(id)}
          className={cx(
            styles.iconButton,
            { [styles.clickable]: isActive || canSelect },
            { [styles.lastColumn]: isLastColumn },
            { [styles.active]: isActive }
          )}
          disabled={isDisabled}
          title={
            isDisabled
              ? 'You can select a maximum of 3 documents'
              : 'Select document to compare'
          }
        >
          <Icon icon={compareSubmittedIcon} className={styles.submitIcon} />
        </Button>
      );
    }
    case SUBMISSION_ICON_VALUE.intends: {
      return (
        <button
          className={cx(styles.iconButton, {
            [styles.lastColumn]: isLastColumn
          })}
        >
          <Icon icon={compareIntendsIcon} className={styles.submitIcon} />
        </button>
      );
    }
    default: {
      return (
        <button
          className={cx(styles.iconButton, {
            [styles.lastColumn]: isLastColumn
          })}
        >
          <Icon icon={compareNotSubmittedIcon} className={styles.submitIcon} />
        </button>
      );
    }
  }
};

const CompareAllTable = ({
  loading,
  tableData,
  titleLinks,
  countryIsos,
  columns,
  noContentMsg,
  selectedTargets,
  setSelectedTargets
}) => (
  <div className={compareTableTheme.compareTableWrapper}>
    {loading && (
      <div className={styles.loaderWrapper}>
        <Loading light />
      </div>
    )}
    {!loading && tableData && tableData.length > 0 && (
      <Table
        data={tableData}
        tableHeight={550}
        tableWidthOffset={-100}
        parseHtml
        titleLinks={titleLinks}
        setColumnWidth={() => 115}
        setRowsHeight={() => 50}
        defaultColumns={columns}
        theme={compareTableTheme}
        customCellRenderer={cell =>
          cellRenderer(
            cell,
            selectedTargets,
            columns,
            setSelectedTargets,
            titleLinks,
            countryIsos
          )
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
  titleLinks: PropTypes.array,
  countryIsos: PropTypes.object,
  noContentMsg: PropTypes.string,
  columns: PropTypes.array,
  selectedTargets: PropTypes.array,
  setSelectedTargets: PropTypes.func.isRequired
};

export default CompareAllTable;
