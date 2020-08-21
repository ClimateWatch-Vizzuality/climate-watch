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
  filterSectoralNDCs,
  getDocumentSlug
} from './ndcs-country-accordion-selectors';

const mapStateToProps = (state, { match, location, category }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : null;
  const ndcsData = {
    data: state.ndcCountryAccordion.data,
    countries: match.params.iso ? [match.params.iso] : locations
  };
  return {
    loading: state.ndcCountryAccordion.loading,
    ndcsData:
      category === 'sectoral_information'
        ? filterSectoralNDCs(ndcsData, { search })
        : filterNDCs(ndcsData, { search }),
    search,
    document: getDocumentSlug(state, { search }),
    iso,
    locations
  };
};

class NdcsCountryAccordionContainer extends PureComponent {
  componentDidMount() {
    const {
      iso,
      fetchNdcsCountryAccordion,
      category,
      search,
      compare,
      lts,
      document
    } = this.props;
    const locations = iso || search.locations;
    if (compare || document) {
      fetchNdcsCountryAccordion({
        locations,
        category,
        compare,
        lts,
        document
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      fetchNdcsCountryAccordion,
      compare,
      lts,
      iso,
      document
    } = this.props;
    const newLocations =
      nextProps.iso || qs.parse(nextProps.location.search).locations;
    const oldLocations = iso || qs.parse(this.props.location.search).locations;
    if (
      newLocations !== oldLocations ||
      (document !== nextProps.document && nextProps.document)
    ) {
      fetchNdcsCountryAccordion({
        locations: newLocations,
        category: nextProps.category,
        compare,
        lts,
        document: nextProps.document
      });
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
  document: PropTypes.string,
  category: PropTypes.string,
  search: PropTypes.object,
  location: PropTypes.object,
  compare: PropTypes.bool,
  lts: PropTypes.bool
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NdcsCountryAccordionContainer)
);
