import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './lts-content-overview-provider-actions';
import reducers, {
  initialState
} from './lts-content-overview-provider-reducers';

class LtsContentOverviewProvider extends PureComponent {
  componentDidMount() {
    const { locations, getLtsContentOverview } = this.props;
    if (locations && locations.length) {
      getLtsContentOverview({ locations });
    }
  }

  componentDidUpdate(prevProps) {
    const { locations, getLtsContentOverview } = this.props;

    if (
      locations &&
      locations.length &&
      prevProps.locations &&
      locations.sort().join() !== prevProps.locations.sort().join()
    ) {
      getLtsContentOverview({ locations });
    }
  }

  render() {
    return null;
  }
}

LtsContentOverviewProvider.propTypes = {
  locations: PropTypes.array,
  getLtsContentOverview: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(LtsContentOverviewProvider);
