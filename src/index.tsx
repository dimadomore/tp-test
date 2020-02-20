import React from 'react';
import ReactDOM from 'react-dom';

import { Widget } from './components';
import { addEnternalFontLink } from './helpers';

const widget = document.getElementById('tp-widget');

if (widget) {
  addEnternalFontLink();
  const params = { ...widget.dataset };

  ReactDOM.render(<Widget {...params} />, document.getElementById('tp-widget'));
}
