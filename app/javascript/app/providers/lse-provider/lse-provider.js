import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './lse-provider-reducers';
import * as actions from './lse-provider-actions';

class LSEProvider extends PureComponent {
  componentDidMount() {
    const { fetchLSE } = this.props;
    fetchLSE();
  }

  render() {
    return null;
  }
}

LSEProvider.propTypes = {
  fetchLSE: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(LSEProvider);
