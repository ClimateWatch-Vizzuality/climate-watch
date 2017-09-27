import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import Dropdown from 'components/dropdown';
import theme from 'styles/themes/dropdown-links.scss';
import styles from './autocomplete-search-styles.scss';

class CountriesSelect extends PureComponent {
  render() {
    const { handleValueClick, setAutocompleteSearch, searchList } = this.props;
    return (
      <div className={styles.wrapper}>
        <Dropdown
          className={theme.dropdownOptionWithArrow}
          placeholder={'e.g. "Brazil", "energy", "reduce emissions by 37%"'}
          options={searchList}
          onInputChange={setAutocompleteSearch}
          onChange={handleValueClick}
          value={null}
          clearable={false}
          white
          searchable
          search
        />
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  handleValueClick: Proptypes.func.isRequired,
  setAutocompleteSearch: Proptypes.func.isRequired,
  searchList: Proptypes.array
};

export default CountriesSelect;
