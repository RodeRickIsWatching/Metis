import * as React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { fadeConfig } from '@/configs/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from '../_util/reactNode';
import { useBoolean, useHover, useDebounceEffect } from 'ahooks';
import './index.scss';

const DIRECTION_MAP = {
  left: 'start' as const,
  right: 'end' as const,
};

type DropdownPlacement = 'left' | 'right';

export interface DropdownProps {
  className?: string;
  placement?: DropdownPlacement;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: 'click' | 'hover';
  disable?: boolean;
}

interface TriggerProps extends DropdownProps {
  followRef: React.RefObject<HTMLDivElement>;
  followID?: string;
  onClose: (...args: any[]) => any;
}

interface PositionProps {
  top: number;
  left: number;
}

const Portal: React.FC<TriggerProps> = (props: TriggerProps) => {
  const { followRef, followID, placement = 'left', children, onClose } = props;

  const innerRef = React.useRef<HTMLDivElement>(null);
  const [direction, setDirection] = React.useState<PositionProps>();
  const extra = DIRECTION_MAP[placement];

  const filterPosition = React.useCallback(
    (space: DOMRect, inside: DOMRect) => {
      const { top: followTop, left: followLeft, width: followWidth, height: followHeight } = space;
      const { width: innerWidth } = inside;
      const siteMap = {
        start: followLeft,
        end: followLeft + followWidth - innerWidth,
      };
      const size: PositionProps = {
        top: followTop + followHeight,
        left: siteMap[extra],
      };
      return size;
    },
    [extra],
  );

  React.useEffect(() => {
    if (!followRef.current || !innerRef.current) return;
    const space = followRef.current.getBoundingClientRect();
    const inside = innerRef.current.getBoundingClientRect();
    const result = filterPosition(space, inside);
    setDirection(result);
  }, [followRef, innerRef, filterPosition]);

  const memoElement = React.useMemo(() => {
    return (
      <motion.div
        className="component-dropdown-trigger"
        ref={innerRef}
        id={followID}
        style={direction}
        onClick={(e) => e.stopPropagation()}
        {...fadeConfig}
      >
        {cloneElement(children, { onClick: onClose })}
      </motion.div>
    );
  }, [followID, direction, children, onClose]);

  return createPortal(memoElement, window.document.body as HTMLElement);
};

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { className, overlay, trigger = 'hover', disable } = props;

  const followRef = React.useRef<HTMLDivElement>(null);
  const uuid = React.useId();

  const classes = classNames(className, 'component-dropdown');

  const [state, { setTrue, setFalse, toggle }] = useBoolean(false);

  const handleLeave = () => {
    if (disable) return;
    if (trigger === 'click') return;
    setFalse();
  };

  const handleEnter = () => {
    if (disable) return;
    if (trigger === 'click') return;
    setTrue();
  };

  // handle event
  const hoverFollow = useHover(followRef, { onEnter: handleEnter });
  const hoverPortal = useHover(() => window.document.getElementById(uuid), {
    onLeave: handleLeave,
  });

  const handleClose = React.useCallback(() => {
    if (hoverFollow || hoverPortal || trigger === 'click') return;
    setFalse();
  }, [hoverFollow, hoverPortal, setFalse, trigger]);

  useDebounceEffect(() => handleClose(), [hoverFollow, hoverPortal], { wait: 150 });

  const toggleClick = () => {
    if (disable) return;
    if (trigger !== 'click') return;

    toggle();
  };

  return (
    <React.Fragment>
      <div onClick={toggleClick} className={`${classes} ${state ? 'open' : ''}`.trimEnd()}>
        {cloneElement(overlay, { ref: followRef })}
      </div>
      <AnimatePresence>
        {state && <Portal followRef={followRef} followID={uuid} onClose={setFalse} {...props} />}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Dropdown;
