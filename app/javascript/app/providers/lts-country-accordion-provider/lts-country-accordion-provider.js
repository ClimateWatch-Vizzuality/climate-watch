import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './lts-country-accordion-provider-actions';
import reducers, {
  initialState
} from './lts-country-accordion-provider-reducers';

class LtsCountryAccordionProvider extends PureComponent {
  componentDidMount() {
    this.props.fetchNdcsCountryAccordion();
  }

  render() {
    return null;
  }
}

LtsCountryAccordionProvider.propTypes = {
  // locations: PropTypes.array,
  fetchNdcsCountryAccordion: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(LtsCountryAccordionProvider);
