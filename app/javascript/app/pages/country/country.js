import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './country-component';
// import allActions from 'app/actions'
// export { default as component } from './other-component'
// export * as reducers from './other-reducers'
// export { default as styles } from './other-styles'
// export { default as actions } from './other-actions'
export default withRouter(connect(null)(Component));
