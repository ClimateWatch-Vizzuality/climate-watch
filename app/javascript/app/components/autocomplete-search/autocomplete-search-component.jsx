import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import Dropdown from 'components/dropdown';
import Icon from 'components/icon';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import styles from './autocomplete-search-styles.scss';

class CountriesSelect extends PureComponent {
  render() {
    const { handleValueClick, setAutocompleteSearch, searchList } = this.props;
    return (
      <div className={styles.wrapper}>
        <Dropdown
          placeholder={'e.g. "Brazil", "energy", "reduce emissions by 37%"'}
          options={searchList}
          onInputChange={setAutocompleteSearch}
          onChange={handleValueClick}
          value={null}
          clearable={false}
          transparent
          searchable
          search
          optionRenderer={option => (
            <div className={styles.optionContainer}>
              <div>{`${option.label}`}</div>
              <div className="link-arrow">
                <Icon icon={dropdownArrow} />
              </div>
            </div>
          )}
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
