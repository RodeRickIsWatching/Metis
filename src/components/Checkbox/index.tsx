import * as React from 'react';
import classNames from 'classnames';
import { cloneElement } from '../_util/reactNode';
import { getImageUrl } from '@/utils/tools';
import './index.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  onChange?: (...args: any[]) => any;
}

const Checkbox: React.FC<CheckboxProps> = React.forwardRef((props: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
  const { className, disabled = false, checked = false, children, onChange } = props;

  const uuid = React.useId();

  const classes = classNames(className, 'component-checkbox', {
    checked,
    disabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked, 'checkbox');
  };

  const memoElement = React.useMemo(() => {
    if (!React.isValidElement(children)) return <span className="content">{children}</span>;
    const renderContent = cloneElement(children, {
      className: `content ${children.props.className ?? ''}`.trimEnd(),
    });
    return renderContent;
  }, [children]);

  return (
    <div className={classes}>
      <input type="checkbox" id={uuid} ref={ref} disabled={disabled} checked={checked} onChange={handleChange} />
      <label className="flex flex-row items-center justify-start" htmlFor={uuid}>
        <div className="choose">
          <img src={getImageUrl('@/assets/images/_global/icon-checkbox.svg')} alt="icon" />
        </div>
        {memoElement}
      </label>
    </div>
  );
});

export default Checkbox;
