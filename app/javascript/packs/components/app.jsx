import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = ({ data: { name } }) => (
  <div>Hello {name}!</div>
)

export default Hello
