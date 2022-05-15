import * as React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders app', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
