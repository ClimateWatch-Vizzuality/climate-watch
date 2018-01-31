import { connect } from 'react-redux';

import { actions } from 'components/hamburger';

import Component from './nav-with-child-menu-component';

export default connect(null, actions)(Component);
