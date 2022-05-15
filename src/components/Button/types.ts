import { HTMLAttributes, ReactNode } from 'react';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: 'circle' | 'list';
  children?: ReactNode;
};
