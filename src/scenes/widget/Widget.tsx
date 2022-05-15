import React, { FC, useState, useCallback } from 'react';
import { Button } from '@/components';
import XIcon from '@/assets/icons/x.svg';
import SmsIcon from '@/assets/icons/sms.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import MessengerIcon from '@/assets/icons/facebook-messenger.svg';
import { applyHook, joinClasses } from '@/utils';
import { useEvent } from '@/hooks';
import styles from './styles.module.css';
import { WidgetProps, StartButtonProps } from './types';

export const useWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, seIsMinimized] = useState(false);

  const handleToggle = () =>
    setIsOpen((current) => {
      window.postMessage('toggle', '*');
      window.parent.postMessage('toggle', '*');
      return !current;
    });

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const { data } = event;
      if (data === 'scroll') {
        seIsMinimized(true);
      }
    },
    [seIsMinimized]
  );

  useEvent('message', handleMessage);

  return {
    isOpen,
    isMinimized,
    handleToggle,
  };
};

const StartButton: FC<StartButtonProps> = ({ isMinimized, handleToggle }) => {
  const content = isMinimized ? (
    <>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </>
  ) : (
    <>
      <SmsIcon />
      <MessengerIcon />
      <InstagramIcon />
      Message us
    </>
  );
  return (
    <Button
      variant={isMinimized ? 'circle' : 'list'}
      onClick={handleToggle}
      className={joinClasses.apply(null, [
        styles.startButton,
        isMinimized ? styles.dots : '',
      ])}
    >
      {content}
    </Button>
  );
};

const WidgetRepresentation: FC<WidgetProps> = ({
  isOpen,
  isMinimized,
  handleToggle,
}) => (
  <div className={styles.widget}>
    <div className={joinClasses(styles.list, isOpen ? styles.open : '')}>
      <Button variant="list">
        <SmsIcon />
        SMS
      </Button>
      <Button variant="list">
        <MessengerIcon />
        Messenger
      </Button>
      <Button variant="list">
        <InstagramIcon />
        Instagram
      </Button>
    </div>
    {isOpen ? (
      <Button onClick={handleToggle}>
        <XIcon />
      </Button>
    ) : (
      <StartButton handleToggle={handleToggle} isMinimized={isMinimized} />
    )}
  </div>
);

export const Widget = applyHook(WidgetRepresentation, useWidget);
