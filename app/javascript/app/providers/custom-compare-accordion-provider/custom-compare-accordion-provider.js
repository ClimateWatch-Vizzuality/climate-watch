import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './custom-compare-accordion-provider-actions';
import reducers, {
  initialState
} from './custom-compare-accordion-provider-reducers';

const CustomCompareAccordionProvider = ({
  locationsDocuments,
  category,
  fetchCustomCompareAccordion
}) => {
  useEffect(() => {
    if (locationsDocuments && category) {
      fetchCustomCompareAccordion({ locationsDocuments, category });
    }
  }, [locationsDocuments]);

  return null;
};

CustomCompareAccordionProvider.propTypes = {
  locationsDocuments: PropTypes.array,
  category: PropTypes.string,
  fetchCustomCompareAccordion: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(CustomCompareAccordionProvider);
