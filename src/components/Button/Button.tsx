import React, { FC } from 'react';
import { joinClasses } from '@/utils';
import { ButtonProps } from './types';
import styles from './styles.module.css';

export const Button: FC<ButtonProps> = ({
  variant = 'circle',
  children,
  className,
  ...rest
}) => (
  <button
    type="button"
    className={joinClasses(styles[variant], className || '')}
    {...rest}
  >
    {children}
  </button>
);
