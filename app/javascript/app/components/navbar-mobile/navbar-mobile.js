import { connect } from 'react-redux';
import Component from './navbar-mobile-component';

const mapStateToProps = state => ({
  hamburgerIsOpen: state.hamburger.isOpen
});

export default connect(mapStateToProps)(Component);
