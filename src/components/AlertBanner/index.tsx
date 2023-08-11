import './index.scss';
import { tuple } from '../_type/type';
import { getImageUrl } from '@/utils/tools';
import { useBoolean } from 'ahooks';

const ButtonTypes = tuple('info', 'warning', 'error', 'success');

const AlignTypes = tuple('flex-start', 'flex-end', 'center');

type ButtonType = (typeof ButtonTypes)[number];

type AlignType = (typeof AlignTypes)[number];

const AlertBanner = ({ type, txt, align }: { type: ButtonType; txt: any; align?: AlignType }) => {
  const [alertVisible, { setFalse }] = useBoolean(true);

  if (!alertVisible) return null;

  return (
    <div className={`alert-banner-container ${type}`}>
      <div className="flex flex-row items-center gap-8" style={{ flex: 1, justifyContent: align }}>
        <img src={getImageUrl(`@/assets/images/alert/icon-${type}.svg`)} />
        <span>{txt}</span>
      </div>
      <img
        onClick={setFalse}
        className="close pointer"
        src={getImageUrl('@/assets/images/_global/icon-close.svg')}
        alt="icon"
      />
    </div>
  );
};

export default AlertBanner;
