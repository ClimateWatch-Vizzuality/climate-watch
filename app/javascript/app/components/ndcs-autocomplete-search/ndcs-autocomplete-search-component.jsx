import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import Dropdown from 'components/dropdown';

import theme from 'styles/themes/dropdown/dropdown-links.scss';
import styles from './ndcs-autocomplete-search-styles.scss';

class NdcsAutocompleteSearch extends PureComponent {
  render() {
    const {
      className,
      handleValueClick,
      searchList,
      groups,
      optionSelected
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        <NdcsSdgsDataProvider />
        <Dropdown
          label="Highlight SDG Linkages"
          className={theme.dropdownOptionWithArrow}
          placeholder="Select a goal or target"
          groups={groups}
          options={searchList}
          onValueChange={handleValueClick}
          value={optionSelected}
          hideResetButton
          dark
        />
      </div>
    );
  }
}

NdcsAutocompleteSearch.propTypes = {
  className: Proptypes.string,
  handleValueClick: Proptypes.func.isRequired,
  searchList: Proptypes.array,
  groups: Proptypes.array,
  optionSelected: Proptypes.object
};

export default NdcsAutocompleteSearch;
