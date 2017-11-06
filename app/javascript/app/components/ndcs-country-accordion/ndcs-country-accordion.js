import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import actions from './ndcs-country-accordion-actions';
import reducers, { initialState } from './ndcs-country-accordion-reducers';

import NdcsCountryAccordionComponent from './ndcs-country-accordion-component';
import {
  filterNDCs,
  filterSectoralNDCs
} from './ndcs-country-accordion-selectors';

const mapStateToProps = (state, { match, location, category }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : null;
  const ndcsData = {
    data: state.ndcCountryAccordion.data,
    search: search.search,
    countries: match.params.iso ? [match.params.iso] : locations
  };
  return {
    loading: state.ndcCountryAccordion.loading,
    ndcsData:
      category === 'sectoral_information'
        ? filterSectoralNDCs(ndcsData)
        : filterNDCs(ndcsData),
    search,
    iso,
    locations
  };
};

class NdcsCountryAccordionContainer extends PureComponent {
  componentWillMount() {
    const {
      iso,
      fetchNdcsCountryAccordion,
      category,
      search,
      compare
    } = this.props;
    const locations = iso || search.locations;
    fetchNdcsCountryAccordion(locations, category, compare);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchNdcsCountryAccordion, compare } = this.props;
    const newLocations = qs.parse(nextProps.location.search).locations;
    const oldLocations = qs.parse(this.props.location.search).locations;
    if (newLocations !== oldLocations) {
      fetchNdcsCountryAccordion(newLocations, nextProps.category, compare);
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
  location: PropTypes.object,
  compare: PropTypes.bool
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NdcsCountryAccordionContainer)
);
