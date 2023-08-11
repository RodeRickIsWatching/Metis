import type {
  NotificationIcon as MessageIcon,
  NotificationProps as MessageProps,
  NotificationOptions as MessageOptions,
  NotificationInstance,
} from '../../Message/types';

// ===========================================
// ============= Notification ================
// ===========================================
export type NotificationIcon = MessageIcon;

export type NotificationProps = MessageProps;

type FirstOptions = Omit<MessageOptions, 'stayTime'>;
type SecondOptions = Pick<MessageProps, 'onClose'>;

export type NotificationOptions = FirstOptions & SecondOptions;

export interface NotificationInstance {
  loading: (props: NotificationOptions) => NotificationReturnInstance;
  success: (options: NotificationOptions) => NotificationReturnInstance;
  warning: (options: NotificationOptions) => NotificationReturnInstance;
  info: (options: NotificationOptions) => NotificationReturnInstance;
  error: (options: NotificationOptions) => NotificationReturnInstance;
}
