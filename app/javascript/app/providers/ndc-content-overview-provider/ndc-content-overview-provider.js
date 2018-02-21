import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndc-content-overview-provider-actions';
import reducers, {
  initialState
} from './ndc-content-overview-provider-reducers';

class ndcContentOverviewProvider extends PureComponent {
  componentDidMount() {
    const { locations, getNDCContentOverview } = this.props;
    getNDCContentOverview(locations);
  }

  componentDidUpdate(prevProps) {
    const { locations, getNDCContentOverview } = this.props;
    if (locations !== prevProps.locations) getNDCContentOverview(locations);
  }

  render() {
    return null;
  }
}

ndcContentOverviewProvider.propTypes = {
  locations: PropTypes.array.isRequired,
  getNDCContentOverview: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(ndcContentOverviewProvider);
