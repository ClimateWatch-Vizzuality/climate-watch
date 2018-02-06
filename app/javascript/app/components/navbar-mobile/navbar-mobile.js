import { connect } from 'react-redux';

import { actions } from 'components/hamburger';

import Component from './navbar-mobile-component';

const mapStateToProps = state => ({
  hamburgerIsOpen: state.hamburger.isOpen
});

export default connect(mapStateToProps, actions)(Component);
