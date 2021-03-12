import { useEffect, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Component from './notification-bell-component';
import getStateProps from './notification-bell-selectors';
import actions from './notification-bell-actions';
import reducers, { initialState } from './notification-bell-reducers';

const NotificationBellContainer = props => {
  const { fetchNotifications } = props;
  useEffect(() => {
    fetchNotifications();
  }, []);
  return createElement(Component, props);
};

NotificationBellContainer.propTypes = {
  fetchNotifications: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(getStateProps, actions)(NotificationBellContainer);
