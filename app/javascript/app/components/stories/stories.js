import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAnalytics } from 'utils/analytics';

import actions from './stories-actions';
import reducers, { initialState } from './stories-reducers';
import StoriesComponent from './stories-component';

const mapStateToProps = state => ({
  stories: state.stories.data
});

class StoriesContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchStories();
  }

  render() {
    const handleClickAnalytics = title => {
      handleAnalytics('Home', 'Clicks from home page block', title);
    };

    return createElement(StoriesComponent, {
      ...this.props,
      handleClickAnalytics
    });
  }
}

StoriesContainer.propTypes = {
  fetchStories: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(StoriesContainer);
