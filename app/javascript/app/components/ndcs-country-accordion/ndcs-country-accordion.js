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
  const locations = search.locations ? search.locations.split(',') : null;
  const ndcsData = {
    data: state.ndcCountryAccordion.data,
    search: search.search,
    countries: match.params.iso
      ? [match.params.iso]
      : locations
  };
  return {
    loading: state.ndcCountryAccordion.loading,
    search,
    ndcsData: filterNDCs(ndcsData),
    iso,
    locations
  };
};

class NdcsCountryAccordionContainer extends PureComponent {
  componentWillMount() {
    const { iso, fetchNdcsCountryAccordion, category, search } = this.props;
    const locations = iso || search.locations;
    fetchNdcsCountryAccordion(locations, category);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchNdcsCountryAccordion } = this.props;
    const newLocations = qs.parse(nextProps.location.search).locations;
    const oldLocations = qs.parse(this.props.location.search).locations;
    if (newLocations !== oldLocations) {
      fetchNdcsCountryAccordion(newLocations, nextProps.category);
    }
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
  category: PropTypes.string,
  search: PropTypes.object,
  location: PropTypes.object
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NdcsCountryAccordionContainer)
);
