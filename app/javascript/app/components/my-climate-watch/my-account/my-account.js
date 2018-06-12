import { connect } from 'react-redux';
import * as actions from 'providers/login-provider/login-provider-actions';
import Component from './my-account-component';

const mapStateToProps = ({ login }) => ({
  email: login.user.email,
  id: login.user.user_id.id,
  name: login.user.user_id.name,
  organization: login.user.user_id.organization,
  areaOfWork: login.user.user_id.areaOfWork
});

export default connect(mapStateToProps, actions)(Component);
