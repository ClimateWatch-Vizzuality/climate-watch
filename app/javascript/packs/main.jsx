import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App data={window.__data} />,
    document.body.appendChild(document.querySelector('#app')),
  )
})
