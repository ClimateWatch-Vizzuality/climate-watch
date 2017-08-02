import { connect } from 'react-redux'
import Component from './header-component'
import allActions from 'app/actions'

// export { default as component } from './header-component'
// export * as reducers from './header-reducers'
// export { default as styles } from './header-styles'
// export { default as actions } from './header-actions'

export default connect(null, allActions)(Component)
