import {
  ComponentType,
  FC,
  createElement,
  ReactElement,
  ReactNode,
} from 'react';

export const applyHook = <P>(
  Component: ComponentType<P> | ((props: P) => ReactElement),
  hook: (props: Partial<P>) => Partial<P>,
  displayName?: string
) => {
  const Applied: FC<Partial<P>> = (props) => {
    const hookResult = hook(props);
    const mergedProps = { ...hookResult, ...props };
    return createElement(
      Component,
      // this cast is stupid, but TS
      mergedProps as P,
      (mergedProps as unknown as { children: unknown }).children as ReactNode
    );
  };

  if (typeof Component === 'function') {
    Applied.displayName = Component.name.replace('Representation', '');
  }

  Applied.displayName = displayName || Applied.displayName;

  return Applied;
};
