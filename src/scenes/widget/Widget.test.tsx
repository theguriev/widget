import * as React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import { Widget, useWidget } from './Widget';

const handleToggle = () => {};

describe('Widget', () => {
  it('renders Widget not minimized and closed', () => {
    const { asFragment } = render(<Widget handleToggle={handleToggle} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Widget minimized and closed', () => {
    const { asFragment } = render(
      <Widget isMinimized handleToggle={handleToggle} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Widget not minimized and open', () => {
    const { asFragment } = render(
      <Widget isOpen handleToggle={handleToggle} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Widget minimized and open', () => {
    const { asFragment } = render(
      <Widget isOpen isMinimized handleToggle={handleToggle} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

const listeners = new Map<string, Set<(event) => void>>();

describe('useWidget', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'addEventListener', {
      value: (type, listener) => {
        if (type !== 'error') {
          listeners.set(type, listeners.get(type) || new Set());
          listeners.get(type).add(listener);
        }
      },
    });
    Object.defineProperty(window, 'removeEventListener', {
      value: (type, listener) => {
        if (type !== 'error') {
          listeners.set(type, listeners.get(type) || new Set());
          listeners.get(type).delete(listener);
        }
      },
    });
  });

  test('handleToggle', () => {
    const { result } = renderHook(() => useWidget());
    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  test('handleMessage', () => {
    const { result } = renderHook(() => useWidget());
    expect(result.current.isMinimized).toBe(false);
    const callbacks = listeners.get('message');
    expect(callbacks.size).toBe(1);
    act(() => {
      callbacks.forEach((callback) => {
        callback({ data: 'scroll' });
      });
    });
    expect(result.current.isMinimized).toBe(true);
  });
});
