import React, { Component } from 'react'
import { clickOutside } from 'utils/react'
import { connect } from 'react-redux'
import CountryExplorer from './country-explorer-component'
import { default as actions } from './country-explorer-actions'

class CountryExplorerContainer extends Component {
  componentWillReceiveProps (nextProps) {
    const { clickedOutside, closeCountryExplorer, open } = nextProps
    if (open && clickedOutside) closeCountryExplorer()
  }

  render () {
    const { toggleCountryExplorer } = this.props
    const onLabelClick = () => toggleCountryExplorer()

    return React.createElement(CountryExplorer, {
      ...this.props, onLabelClick, label: 'Countries'
    })
  }
}

export { default as reducers } from './country-explorer-reducers'
export { default as actions } from './country-explorer-actions'

export default connect(state => state.countryExplorer, actions)(
  clickOutside(CountryExplorerContainer)
)
