import * as React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (...args: any[]) => any;
}

const Switch: React.FC<SwitchProps> = React.forwardRef((props: SwitchProps, ref: React.Ref<HTMLInputElement>) => {
  const { className, disabled = false, checked = false, onChange } = props;

  const uuid = React.useId();

  const classes = classNames(className, 'component-switch', {
    checked,
    disabled,
  });

  const handleChange: React.MouseEventHandler<HTMLInputElement> = () => {
    if (disabled) return;
    onChange?.(!checked, 'switch');
  };

  return (
    <div className={classes}>
      <label htmlFor={uuid}>
        <input type="checkbox" id={uuid} ref={ref} disabled={disabled} onClick={handleChange} />
      </label>
    </div>
  );
});

export default Switch;
