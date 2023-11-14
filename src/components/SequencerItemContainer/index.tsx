import fetchBatchBlockTx from '@/graphql/batchBlockAndTimestamp';
import { getImageUrl } from '@/utils/tools';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);


const SequencerStatusContainer = styled.div`
  .avatar {
    background: url(${getImageUrl('@/assets/images/sequencer/avatar.svg')}) no-repeat;
  }
`;

const SequencerItemContainer = ({ ele, onClick, avatar, title, totalLockUp, uptime, since, earned }: any) => {
  const { run, loading, data } = useRequest(fetchBatchBlockTx, { manual: true });

  useEffect(() => {
    if (ele?.user) {
      run(ele?.user);
    }
  }, [ele?.user]);

  const fromNow = useMemo(() => {
    if(!data) return '-'
    const _duration = data - +dayjs().unix();
    return dayjs.duration(_duration, 's').humanize(true);
  }, [data]);

  return (
    <SequencerStatusContainer
      onClick={onClick}
      style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }}
      className="pointer radius-30 w-340 pt-37 pl-30 pr-30 pb-20 flex flex-col gap-42 items-center position-relative"
    >
      <div className="flex flex-row items-center gap-8 position-absolute top-14 right-20">
        <span className="fz-14 fw-500 color-00EA5E">Healthy</span>
        <div className="s-12 bg-color-00EA5E radiusp-50" />
      </div>

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
              <div className="fz-14 fw-700 color-000">{totalLockUp || '-'}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="fz-14 color-000 fw-400">Uptime</div>
            <div className="fz-14 fw-700 color-000">{fromNow || '-'}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="fz-14 color-000 fw-400">Sequencing Since</div>
            <div className="fz-14 fw-700 color-000">{since || '-'}</div>
          </div>
        </div>
        <div className="h-1 w-full mt-10 mb-10 bg-color-CDCDCD" />
        <div className="flex flex-row justify-between items-center w-full">
          <div className="fz-14 color-000 fw-400">Earned</div>

          <div className="flex flex-row items-center gap-4">
            <img src={getImageUrl('@/assets/images/sequencer/avatar.svg')} className="s-13" />
            <div className="fz-14 fw-700 color-000">{ele?.rewardReadable || '-'}</div>
          </div>
        </div>
      </div>
    </SequencerStatusContainer>
  );
};
export default SequencerItemContainer;
