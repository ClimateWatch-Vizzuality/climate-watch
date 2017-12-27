import React from 'react';
import PropTypes from 'prop-types';

const MyAccount = ({ user }) => (
  <div>
    <h1>User details</h1>
    <span>Email:</span>
    <span>{user.email}</span>
  </div>
);

MyAccount.propTypes = {
  user: PropTypes.object.isRequired
};

export default MyAccount;
