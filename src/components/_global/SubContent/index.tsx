import { ReactElement } from 'react';
import './index.scss';

const SubContent = ({ suffix, title, children }: { suffix?: ReactElement; title: string; children: any }) => {
  return (
    <div className="flex flex-col">
      <div className="sub-content-title flex flex-row items-center gap-24">
        <span>{title}</span>
        {suffix}
      </div>

      <div className="sub-content">{children}</div>
    </div>
  );
};

export default SubContent;
