import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const widget = document.getElementById('tp-widget');

if (widget) {
  const params = { ...widget.dataset };

  ReactDOM.render(<App {...params} />, document.getElementById('tp-widget'));
}
