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

const Message: React.FC<NotificationProps> = React.forwardRef(
  (props: NotificationProps, ref: React.Ref<HTMLDivElement>) => {
    const { icon, message, onMouseEnter, onMouseLeave, onClose } = props;

    return (
      <motion.div
        className="component-message flex flex-row items-center justify-center"
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...messageConfig}
      >
        {ICON_GROUP[icon ?? 'success']}
        <span className={icon}>{message}</span>
      </motion.div>
    );
  },
);

export default Message;
