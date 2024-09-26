import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndc-2025-provider-actions';
import reducers, { initialState } from './ndc-2025-provider-reducers';

class Ndc2025Provider extends PureComponent {
  componentDidMount() {
    const { get2025NdcTracker } = this.props;
    get2025NdcTracker();
  }

  componentWillReceiveProps() {
    this.props.get2025NdcTracker();
  }

  render() {
    return null;
  }
}

Ndc2025Provider.propTypes = {
  get2025NdcTracker: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(Ndc2025Provider);

