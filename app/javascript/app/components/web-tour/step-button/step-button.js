import { connect } from 'react-redux';
import Component from './step-button-component';
import actions from '../web-tour-actions';

const getStateProps = state => ({
  isOpen: state.tour.isOpen
});

export default connect(getStateProps, actions)(Component);
