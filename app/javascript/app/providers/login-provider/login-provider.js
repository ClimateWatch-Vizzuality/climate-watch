import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './login-provider-actions';
import reducers, { initialState } from './login-provider-reducers';

class LoginProvider extends PureComponent {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return null;
  }
}

LoginProvider.propTypes = {
  getUser: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(LoginProvider);
