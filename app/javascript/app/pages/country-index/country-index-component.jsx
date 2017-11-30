import React, { PureComponent } from 'react';
import CountriesSelect from 'components/countries-select';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';

class CountryIndex extends PureComponent {
  render() {
    const { toggleCountriesMenu } = this.props;
    return (
      <ClickOutside onClickOutside={toggleCountriesMenu}>
        <CountriesSelect />
      </ClickOutside>
    );
  }
}

CountryIndex.propTypes = {
  toggleCountriesMenu: PropTypes.func.isRequired
};

export default CountryIndex;
