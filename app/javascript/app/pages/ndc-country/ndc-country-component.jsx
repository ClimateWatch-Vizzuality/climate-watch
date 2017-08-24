import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';

class NDCCountry extends PureComponent {
  componentWillMount() {
    const { hasData, match, fetchCountryNDC } = this.props;
    const { iso } = match.params;
    if (!hasData && iso) {
      fetchCountryNDC(iso);
    }
  }

  render() {
    const { countryName } = this.props;
    return (
      <div>
        <Header>
          <Intro title={countryName.label} />
        </Header>
        <Accordion />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  match: Proptypes.object.isRequired,
  hasData: Proptypes.bool.isRequired,
  countryName: Proptypes.object.isRequired,
  fetchCountryNDC: Proptypes.func.isRequired // eslint-disable-line
};

export default NDCCountry;
