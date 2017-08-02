import React, { Component } from 'react'
import { clickOutside } from 'utils/react'
import { connect } from 'react-redux'
import CountryExplorer from './country-explorer-component'
import { default as actions } from './country-explorer-actions'

class CountryExplorerContainer extends Component {
  componentWillReceiveProps (nextProps) {
    const { clickedOutside, closeCountryExplorer } = nextProps
    if (clickedOutside) closeCountryExplorer()
  }

  render () {
    return React.createElement(CountryExplorer, this.props)
  }
}

const mapStateToProps = state => state.countryExplorer

export default connect(mapStateToProps, actions)(clickOutside(CountryExplorerContainer))
