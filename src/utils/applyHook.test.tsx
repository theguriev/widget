import React from 'react';
import { render } from '@testing-library/react';
import { applyHook } from './applyHook';

const useTest = () => ({ testProp: 'abc' });

const TestComponentRepresentation = ({ testProp }: { testProp: string }) => (
  <h1>{testProp}</h1>
);

const TestComponent = applyHook(TestComponentRepresentation, useTest);

describe('apply hook', () => {
  it('add testProp to the componeent', () => {
    expect.assertions(1);
    const { asFragment } = render(<TestComponent />);
    expect(asFragment().querySelector('h1').textContent).toBe('abc');
  });

  it('check displayName', () => {
    expect.assertions(1);
    expect(TestComponent.displayName).toBe('TestComponent');
  });
});
