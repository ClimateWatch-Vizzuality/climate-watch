import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App data={Object.assign({}, window.__data)} />,
    document.querySelector('#root')
  );
});
