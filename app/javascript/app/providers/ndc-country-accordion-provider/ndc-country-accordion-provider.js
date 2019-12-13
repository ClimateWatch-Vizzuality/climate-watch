import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './ndc-country-accordion-provider-actions';
import reducers, {
  initialState
} from './ndc-country-accordion-provider-reducers';

class NdcsCountryAccordionProvider extends PureComponent {
  componentDidMount() {
    const { locations, category, lts } = this.props;
    this.props.fetchNdcsCountryAccordion({ locations, category, lts });
  }

  render() {
    return null;
  }
}

NdcsCountryAccordionProvider.propTypes = {
  locations: PropTypes.array,
  lts: PropTypes.bool,
  category: PropTypes.string,
  fetchNdcsCountryAccordion: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(NdcsCountryAccordionProvider);
