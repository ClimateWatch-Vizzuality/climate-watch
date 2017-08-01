import { connect } from 'react-redux'
import Component from './header-component'
import allActions from 'app/actions'

export default connect(null, allActions)(Component)
