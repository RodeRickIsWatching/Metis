import * as React from 'react';
import StackManager from './core/StackManager';
import Message from './core/Message';
import type { MessageProps, MessageOptions, MessageIcon, MessageInstance } from './types';

// To muster options
export function handleOptions(options: MessageProps | React.ReactNode): MessageProps {
  if (options && Object.prototype.toString.call(options) === '[object Object]' && !React.isValidElement(options)) {
    return { ...(options as MessageProps) };
  }
  return { message: options as React.ReactNode };
}

const managerInstance = new StackManager(Message);

function showMessage(options: MessageOptions, icon: MessageIcon) {
  const newOptions = handleOptions(options);
  newOptions.icon = icon;
  if (!newOptions.stayTime && newOptions.stayTime !== 0) {
    newOptions.stayTime = newOptions.icon === 'loading' ? 0 : 3_000;
  }
  return managerInstance.open(newOptions);
}

const messageInstance: Partial<MessageInstance> = {};

(['success', 'warning', 'info', 'error', 'loading'] as MessageIcon[]).forEach((iconType) => {
  messageInstance[iconType] = (options: MessageOptions) => {
    return showMessage(options, iconType);
  };
});

export default messageInstance as MessageInstance;
