import { connect } from 'react-redux';

import MyAccountComponent from './my-account-component';

const mapStateToProps = ({ login }) => ({
  user: login.user
});

export default connect(mapStateToProps, null)(MyAccountComponent);
