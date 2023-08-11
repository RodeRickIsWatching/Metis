import * as React from 'react';
import { messageConfig } from '@/configs/motion';
import { motion } from 'framer-motion';
import { IconGlobalSpin } from '@/assets/icons/IconGroup';
import { getImageUrl } from '@/utils/tools';
import type { NotificationProps } from '../types';
import '../style/index.scss';

const ICON_GROUP = {
  success: <img src={getImageUrl('@/assets/images/_global/icon-success.svg')} alt="icon" />,
  warning: <img src={getImageUrl('@/assets/images/_global/icon-warning.svg')} alt="icon" />,
  info: <img src={getImageUrl('@/assets/images/_global/icon-info.svg')} alt="icon" />,
  error: <img src={getImageUrl('@/assets/images/_global/icon-error.svg')} alt="icon" />,
  loading: <IconGlobalSpin />,
};

const Notification: React.FC<NotificationProps> = React.forwardRef(
  (props: NotificationProps, ref: React.Ref<HTMLDivElement>) => {
    const { icon, message, description, onMouseEnter, onMouseLeave, onClose } = props;

    return (
      <motion.div
        className="component-notification"
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...messageConfig}
      >
        <div className="title flex flex-row items-center justify-center">
          {ICON_GROUP[icon ?? 'success']}
          <h4>{message}</h4>
          <img
            className="close"
            src={getImageUrl('@/assets/images/_global/icon-close.svg')}
            alt="icon"
            onClick={() => {
              onClose?.();
            }}
          />
        </div>
        {description && <p className="description">{description}</p>}
      </motion.div>
    );
  },
);

export default Notification;
