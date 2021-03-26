import { createElement } from 'react';
import PropTypes from 'prop-types';
import Component from './notification-modal-component';

const NotificationModalContainer = props => createElement(Component, props);

export default NotificationModalContainer;

NotificationModalContainer.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  setLastDateShown: PropTypes.func.isRequired
};
