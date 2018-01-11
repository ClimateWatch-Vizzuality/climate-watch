// import { createElement, Component } from 'react'
import { connect } from 'react-redux';

import * as actions from './nav-enhanced-menu-actions';
import * as reducers from './nav-enhanced-menu-reducers';

import NavEnhancedMenuComponent from './nav-enhanced-menu-component';

// const mapStateToProps = ({navEnhancedMenu}) => navEnhancedMenu

const initialState = { isOpen: false };

const mapStateToProps = ({ navEnhancedMenu }) => navEnhancedMenu;
export { actions, reducers, initialState };
export default connect(mapStateToProps, actions)(NavEnhancedMenuComponent);
