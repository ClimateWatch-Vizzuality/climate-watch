import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './ndc-content-overview-provider-actions';
import reducers, {
  initialState
} from './ndc-content-overview-provider-reducers';

class ndcContentOverviewProvider extends PureComponent {
  componentDidMount() {
    const { locations, document, getNdcContentOverview } = this.props;
    if (locations && locations.length) {
      getNdcContentOverview({ locations, document });
    }
  }

  componentDidUpdate(prevProps) {
    const { locations, document, getNdcContentOverview } = this.props;

    if (
      (document && document !== prevProps.document) ||
      (locations &&
        locations.length &&
        prevProps.locations &&
        locations.sort().join() !== prevProps.locations.sort().join())
    ) {
      getNdcContentOverview({ locations, document });
    }
  }

  render() {
    return null;
  }
}

ndcContentOverviewProvider.propTypes = {
  locations: PropTypes.array,
  document: PropTypes.string,
  getNdcContentOverview: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(ndcContentOverviewProvider);
