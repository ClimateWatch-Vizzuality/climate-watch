import { connect } from 'react-redux';

import { CWAPI } from 'services/api';

import MyAccountComponent from './my-account-component';

const updateUser = (id, payload) => {
  CWAPI.patch(`my_cw/users/${id}`, payload);
};

const mapStateToProps = ({ login }) => ({
  user: login.user,
  id: login.user.user_id.id,
  updateUser
});

export default connect(mapStateToProps, null)(MyAccountComponent);
