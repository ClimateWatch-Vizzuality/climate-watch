import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import actions from './ndcs-country-accordion-actions';
import reducers, { initialState } from './ndcs-country-accordion-reducers';

import NdcsCountryAccordionComponent from './ndcs-country-accordion-component';
import { filterNDCs } from './ndcs-country-accordion-selectors';

const mapStateToProps = (state, { match, location }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const ndcsData = {
    data: state.ndcCountryAccordion.data[match.params.iso],
    search: search.search,
    countries: [match.params.iso]
  };
  return {
    fetched: state.ndcCountryAccordion.data[iso],
    loading: state.ndcCountryAccordion.loading,
    search: search.search,
    ndcsData: filterNDCs(ndcsData),
    iso
  };
};

class NdcsCountryAccordionContainer extends PureComponent {
  componentWillMount() {
    const { iso, fetchNdcsCountryAccordion, category } = this.props;
    fetchNdcsCountryAccordion(iso, category);
  }

  render() {
    return createElement(NdcsCountryAccordionComponent, {
      ...this.props
    });
  }
}

NdcsCountryAccordionContainer.propTypes = {
  fetchNdcsCountryAccordion: PropTypes.func,
  iso: PropTypes.string,
  category: PropTypes.string
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NdcsCountryAccordionContainer)
);
