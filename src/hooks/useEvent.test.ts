import { renderHook } from '@testing-library/react';
import { useEvent } from './useEvent';

const listeners = new Map<string, Set<() => void>>();

describe('useEvent', () => {
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

  it('should call addEventListener/removeEventListener on mount/unmount', () => {
    expect.assertions(2);
    const { unmount } = renderHook(() => {
      useEvent('message', () => {});
    });
    expect(listeners.get('message').size).toBe(1);
    unmount();
    expect(listeners.get('message').size).toBe(0);
  });
});
