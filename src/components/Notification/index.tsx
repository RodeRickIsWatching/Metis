import * as React from 'react';
import StackManager from '../Message/core/StackManager';
import Notification from './core/Notification';
import type { NotificationProps, NotificationIcon, NotificationOptions, NotificationInstance } from './types';

// To muster options
export function handleOptions(options: NotificationProps): NotificationProps {
  if (options && Object.prototype.toString.call(options) === '[object Object]' && !React.isValidElement(options)) {
    return { ...(options as NotificationProps) };
  }
  return options;
}

const managerInstance = new StackManager(Notification);

function showNotification(options: NotificationOptions, icon: NotificationIcon) {
  const newOptions = handleOptions(options);
  newOptions.icon = icon;
  if (!newOptions.stayTime && newOptions.stayTime !== 0) {
    newOptions.stayTime = newOptions.icon === 'loading' ? 0 : 4_500;
  }
  return managerInstance.open(newOptions);
}

const notificationInstance: Partial<NotificationInstance> = {};

(['success', 'warning', 'info', 'error', 'loading'] as NotificationIcon[]).forEach((iconType) => {
  notificationInstance[iconType] = (options: NotificationOptions) => {
    return showNotification(options, iconType);
  };
});

export default notificationInstance as NotificationInstance;
