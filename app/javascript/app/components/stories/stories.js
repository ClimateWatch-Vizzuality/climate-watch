import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StoriesComponent from './stories-component';
import actions from './stories-actions';

const mapStateToProps = state => ({
  stories: state.stories.data
});

class StoriesContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchStories();
  }

  render() {
    return createElement(StoriesComponent, {
      ...this.props
    });
  }
}

StoriesContainer.propTypes = {
  fetchStories: PropTypes.func.isRequired
};

export { default as component } from './stories-component';
export { initialState } from './stories-reducers';
export { default as reducers } from './stories-reducers';
export { default as styles } from './stories-styles';
export { default as actions } from './stories-actions';

export default connect(mapStateToProps, actions)(StoriesContainer);
