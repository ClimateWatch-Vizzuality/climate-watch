import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from 'components/modal-metadata';
import Component from './context-by-country-component';

class ContextByCountryContainer extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      customTitle: 'Data Sources',
      category: 'Agriculture - Context by Country',
      slugs: [
        'FAOSTAT_3',
        'FAOSTAT_4',
        'FAOSTAT_5',
        'WBD',
        'OECD-FAO',
        'Aqueduct_Country_River_Basin_Rankings'
      ],
      open: true
    });
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleInfoClick: this.handleInfoClick
    });
  }
}

ContextByCountryContainer.propTypes = {
  setModalMetadata: PropTypes.func
};

export default connect(null, actions)(ContextByCountryContainer);
