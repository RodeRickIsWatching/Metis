import { getImageUrl } from '@/utils/tools';
import './index.scss';

const NoData = ({ ...props }) => {
  return (
    <div className="components-nodata flex flex-col items-center justify-center gap-4" {...props}>
      <img style={{ width: '45px', height: '45px' }} src={getImageUrl('@/assets/images/_global/icon-noData.svg')} />
      <span className="f-12 sub-color">No Data</span>
    </div>
  );
};

export default NoData;
