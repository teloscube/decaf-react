import { DecafClient } from '@decafhub/decaf-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { DecafApp, DecafSpinner } from './';

describe('<DecafApp />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    // Get the controller:
    const dummyController = {
      getDecafClient() {
        return undefined as unknown as DecafClient;
      },

      onSessionExpired() {
        window.location.href = `/webapps/waitress/production/?next=${window.location.href}&reason=session-expired`;
        return null;
      },

      onLoadingState(_loading: boolean) {
        return null;
      },

      loadingComponent: <>{null as React.ReactNode}</>,
    };

    ReactDOM.render(
      <DecafApp controller={dummyController}>
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
