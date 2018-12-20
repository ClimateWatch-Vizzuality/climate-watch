import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './stories-actions';
import reducers, { initialState } from './stories-reducers';

class StoriesContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchStories();
  }

  render() {
    return null;
  }
}

StoriesContainer.propTypes = {
  fetchStories: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(StoriesContainer);
