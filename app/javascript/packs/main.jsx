import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import initialState from 'app/data/initial-state';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App data={Object.assign({}, window.__data, initialState)} />,
    document.querySelector('#root')
  );
});
