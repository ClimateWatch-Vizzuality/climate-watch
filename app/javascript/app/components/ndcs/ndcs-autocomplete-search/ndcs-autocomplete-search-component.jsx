import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import { NDC_DOCUMENT_OPTIONS } from 'data/constants';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import Dropdown from 'components/dropdown';
import Search from 'components/search';

import theme from 'styles/themes/dropdown/dropdown-links.scss';
import styles from './ndcs-autocomplete-search-styles.scss';

class NdcsAutocompleteSearch extends PureComponent {
  render() {
    const {
      className,
      onSearchChange,
      onDocumentChange,
      searchList,
      groups,
      document,
      optionSelected,
      documentSelected,
      label,
      global,
      search,
      handleKeyUp,
      dark,
      documentSelector
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        <div
          className={cx(styles.dropdownsLayout, {
            [styles.withDocumentSelector]: documentSelector
          })}
        >
          {global ? (
            <NdcsSdgsMetaProvider />
          ) : (
            <NdcsSdgsDataProvider document={document} />
          )}
          {documentSelector && (
            <Dropdown
              options={NDC_DOCUMENT_OPTIONS}
              onValueChange={onDocumentChange}
              value={documentSelected}
              hideResetButton
              white={!dark}
            />
          )}
          <Dropdown
            label={label ? 'Explore linkages between NDCs and SDGs' : ''}
            className={theme.dropdownOptionWithArrow}
            placeholder="Select a goal or target"
            groups={groups}
            options={searchList}
            onValueChange={onSearchChange}
            value={optionSelected}
            hideResetButton
            white={!dark}
            noAutoSort
          />
          <Search
            className={label ? styles.search : ''}
            placeholder="e.g. “reduce emissions by 37%”"
            value={search.searchBy === 'query' ? search.query : ''}
            handleKeyUp={handleKeyUp}
          />
        </div>
      </div>
    );
  }
}

NdcsAutocompleteSearch.propTypes = {
  className: Proptypes.string,
  onSearchChange: Proptypes.func.isRequired,
  onDocumentChange: Proptypes.func.isRequired,
  documentSelected: Proptypes.object,
  searchList: Proptypes.array,
  groups: Proptypes.array,
  document: Proptypes.string,
  optionSelected: Proptypes.object,
  label: Proptypes.bool,
  global: Proptypes.bool,
  search: Proptypes.object,
  handleKeyUp: Proptypes.func,
  dark: Proptypes.bool,
  documentSelector: Proptypes.bool
};

export default NdcsAutocompleteSearch;
