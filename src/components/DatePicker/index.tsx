import * as React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { filterTime, getImageUrl } from '@/utils/tools';
import { useClickAway } from 'ahooks';
import Calendar from './core/DatePicker';
import RangeCalendar from './core/RangePicker';
import { fadeConfig } from '@/configs/motion';
import { AnimatePresence, motion } from 'framer-motion';
import './style/index.scss';

type DropdownPlacement = 'left' | 'right';

type SizeType = 'sm' | 'md' | 'lg';

export interface DatePickerProps<T extends 'date' | 'range'> {
  className?: string;
  follow?: boolean;
  size?: SizeType;
  placement?: DropdownPlacement;
  type: T;
  value?: T extends 'date' ? number : [number, number];
  danger?: boolean;
  disabled?: boolean;
  placeholder?: string;
  overlay?: React.ReactNode;
  onChange?: (v: T extends 'date' ? number : [number, number]) => any;
}

const DIRECTION_MAP = {
  left: 'start' as const,
  right: 'end' as const,
};

interface PositionProps {
  top: number;
  left?: number;
  right?: number;
  height?: number;
}

interface TriggerProps extends DatePickerProps<'date' | 'range'> {
  followRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  onClose: (...args: any[]) => any;
}

const Portal: React.FC<TriggerProps> = (props: TriggerProps) => {
  const { followRef, value, placement = 'left', type = 'date', follow, onChange, onClose } = props;

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
        // end: followLeft - Math.abs(followWidth - innerWidth),
      };
      const rectSize: PositionProps = {
        top: (follow ? 0 : followTop) + followHeight + 4,
        // [placement]: follow ? -1 : siteMap[extra],
        left: follow ? -1 : siteMap[extra],
      };

      return rectSize;
    },
    [follow, extra],
  );

  React.useEffect(() => {
    if (!followRef.current || !innerRef.current) return;
    const space = followRef.current.getBoundingClientRect();
    const inside = innerRef.current.getBoundingClientRect();
    const result = filterPosition(space, inside);
    setDirection(result);
  }, [followRef, innerRef, filterPosition]);

  const [date, setDate] = React.useState<number | undefined>(() => {
    return type === 'date' ? (value as number) : undefined;
  });
  const [rangeDate, setRangeDate] = React.useState<number[] | undefined>(() => {
    return type === 'range' ? (value as number[]) : undefined;
  });

  const selectTrigger = React.useMemo(() => {
    if (!followRef.current) return;
    return (
      <motion.div
        className="component-datepicker-trigger"
        ref={innerRef}
        style={direction}
        onClick={(e) => e.stopPropagation()}
        {...fadeConfig}
      >
        {/* {cloneElement(children, { onClick: onClose })} */}
        {type === 'date' && (
          <Calendar
            value={date}
            onChange={(d) => {
              setDate(d.startOf('day').valueOf());
              // console.log(d);
              onChange?.(d.startOf('day').valueOf());
              onClose();
            }}
          />
        )}
        {type === 'range' && (
          <RangeCalendar
            value={rangeDate}
            onChange={(dateRange) => {
              setRangeDate(dateRange);
              // console.log(dateRange);
              onChange?.(dateRange as [number, number]);
              onClose();
            }}
          />
        )}
      </motion.div>
    );
  }, [followRef, direction, type, date, rangeDate, onChange, onClose]);

  useClickAway(() => onClose?.(), followRef);

  const DOM = (follow && followRef.current ? followRef.current : window.document.body) as HTMLElement;
  return createPortal(selectTrigger, DOM);
};

function DatePicker<T extends 'date' | 'range'>(props: DatePickerProps<T>) {
  const {
    className,
    value,
    follow = false,
    type = 'date',
    size = 'md',
    danger = false,
    disabled = false,
    placeholder,
  } = props;

  const followRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  const classes = classNames(className, 'component-datepicker', {
    follow,
    [`${size}`]: size,
    danger,
    disabled,
    visible,
  });

  // handle event
  const handleOpen: React.MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleClose: React.MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) return;
    setVisible(false);
  };

  const memoElement = React.useMemo(() => {
    const isDate = type === 'date' && typeof value !== 'number';
    const isRange = type === 'range' && (!Array.isArray(value) || value.length !== 2);
    if (isDate || isRange) return <span className="placeholder">{placeholder}</span>;
    const renderClone = (
      <p className="selection">
        {type === 'date'
          ? filterTime(`${value}`)
          : `${filterTime(String(value?.[0]))} - ${filterTime(String(value?.[1]))}`}
      </p>
    );
    // <img src={getImageUrl('@/assets/images/profile/icon-SwapRightOutlined.svg')} alt="icon" />
    return renderClone;
  }, [placeholder, type, value]);

  return (
    <React.Fragment>
      <div className={classes} ref={followRef} onClick={handleOpen}>
        <div className="inside flex flex-row items-center justify-between">
          {memoElement}
          <img src={getImageUrl('@/assets/images/profile/icon-CalendarOutlined.svg')} alt="icon" />
        </div>
      </div>
      <AnimatePresence>{visible && <Portal {...props} followRef={followRef} onClose={handleClose} />}</AnimatePresence>
    </React.Fragment>
  );
}

export default DatePicker;
