import React from 'react';
import ReactDOM from 'react-dom';
import { DecafApp, DecafSpinner } from './';

describe('<DecafApp />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <DecafApp>
        <span>hello world</span>
      </DecafApp>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<DecasSpinner />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DecafSpinner />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
