import useSequencerInfo from '@/hooks/useSequencerInfo';
import { getImageUrl } from '@/utils/tools';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SequencerStatusContainer = styled.div`
  .avatar {
    background: url(${getImageUrl('@/assets/images/sequencer/avatar.svg')}) no-repeat;
  }
`;

const SequencerItemContainer = ({ ele, onClick, avatar, title, totalLockUp, uptime, since, earned }: any) =>
  // {avatar, title, totalLockUp, uptime, since, earned}
  {
    const [sequencerInfo, setSequencerInfo] = useState<any>(undefined);

    // sequencerId = ele?.sequencerId
    const { runOnce } = useSequencerInfo();
    const checkInfo = async () => {
      if (!ele?.sequencerId) return;
      const data = await runOnce({ sequencerId: ele?.sequencerId });
      setSequencerInfo(data);
    };

    useEffect(() => {
      if (ele?.sequencerId) {
        checkInfo();
      }
    }, [ele?.sequencerId]);

    return (
      <SequencerStatusContainer
        onClick={onClick}
        style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }}
        className="pointer radius-30 w-340 pt-37 pl-30 pr-30 pb-20 flex flex-col gap-42 items-center"
      >
        <div className="flex flex-col gap-5">
          <div className={'avatar s-90 radiusp-50'}>{avatar ? <img src={avatar} /> : null}</div>
          <div className="align-center fz-20 fw-700 poppins">{title}</div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="fz-14 color-000 fw-400">Total Lock-up</div>
              <div className="flex flex-row items-center gap-4">
                <img src={getImageUrl('@/assets/images/sequencer/avatar.svg')} className="s-13" />
                <div className="fz-14 fw-700 color-000">{totalLockUp}</div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="fz-14 color-000 fw-400">Uptime</div>
              <div className="fz-14 fw-700 color-000">{uptime}</div>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="fz-14 color-000 fw-400">Sequencing Since</div>
              <div className="fz-14 fw-700 color-000">{since}</div>
            </div>
          </div>
          <div className="h-1 w-full mt-10 mb-10 bg-color-CDCDCD" />
          <div className="flex flex-row justify-between items-center w-full">
            <div className="fz-14 color-000 fw-400">Earned</div>

            <div className="flex flex-row items-center gap-4">
              <img src={getImageUrl('@/assets/images/sequencer/avatar.svg')} className="s-13" />
              <div className="fz-14 fw-700 color-000">{sequencerInfo?.rewardReadable || '0'}</div>
            </div>
          </div>
        </div>
      </SequencerStatusContainer>
    );
  };
export default SequencerItemContainer;
