import React from 'react';
import ReactDOM from 'react-dom';

import { Widget } from './components';
import { addFontLink } from './helpers';

addFontLink();
const widget = document.getElementById('tp-widget');

if (widget) {
  const params = { ...widget.dataset };

  ReactDOM.render(<Widget {...params} />, document.getElementById('tp-widget'));
}
