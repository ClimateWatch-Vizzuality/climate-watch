import { connect } from 'react-redux'
import Component from './other-component'
import actions from './other-actions'

// export { default as component } from './other-component'
export { default as reducers } from './other-reducers'
export { default as actions } from './other-actions'

export default connect(state => state.other, actions)(Component)
