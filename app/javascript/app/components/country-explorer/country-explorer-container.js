import { connect } from 'react-redux'
import Component from './country-explorer-component'
import { default as actions } from './country-explorer-actions'

const mapStateToProps = state => state.countryExplorer

export default connect(mapStateToProps, actions)(Component)
