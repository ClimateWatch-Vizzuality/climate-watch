import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndc-content-overview-provider-actions';
import reducers, {
  initialState
} from './ndc-content-overview-provider-reducers';

class ndcContentOverviewProvider extends PureComponent {
  componentDidMount() {
    const { locations, getNdcContentOverview } = this.props;
    if (locations && locations.length) getNdcContentOverview(locations);
  }

  componentDidUpdate(prevProps) {
    const { locations, getNdcContentOverview } = this.props;
    if (locations && locations.length && (locations !== prevProps.locations)) getNdcContentOverview(locations);
  }

  render() {
    return null;
  }
}

ndcContentOverviewProvider.propTypes = {
  locations: PropTypes.array,
  getNdcContentOverview: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(ndcContentOverviewProvider);
