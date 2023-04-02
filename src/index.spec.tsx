import React from 'react';
import { createRoot } from 'react-dom/client';
import { DecafApp, DecafSpinner } from './';

describe('<DecafApp />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <DecafApp>
        <span>hello world</span>
      </DecafApp>
    );
    root.unmount();
  });
});

describe('<DecasSpinner />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<DecafSpinner />);
    root.unmount();
  });
});
