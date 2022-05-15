import { useEffect } from 'react';

export const useEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (ev: WindowEventMap[K]) => unknown
) => {
  useEffect(() => {
    window.addEventListener(type, listener);
    return () => {
      window.removeEventListener(type, listener);
    };
  }, [type, listener]);
};
