import { getImageUrl } from "@/utils/tools"
import styled from "styled-components"

const SequencerStatusContainer = styled.div`
  .avatar{
    background: url(${getImageUrl('@/assets/images/sequencer/avatar.svg')}) no-repeat;

  }
`

const SequencerItemContainer = ({ onClick, avatar, title, totalLockUp, uptime, since, earned }: any
  // {avatar, title, totalLockUp, uptime, since, earned}
) => {

  return (
    <SequencerStatusContainer
      onClick={onClick}
      style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }}
      className="radius-30 w-340 pt-37 pl-30 pr-30 pb-20 flex flex-col gap-42 items-center">
      <div className="flex flex-col gap-5">
        <div className={`avatar s-90 radiusp-50`}>
          {avatar ? <img src={avatar} /> : null}
        </div>
        <div>{title}</div>
      </div>
      <div className="flex flex-col w-full gap-4">
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
        <div className="h-1 w-full mt-10 mb-10 bg-color-CDCDCD" />
        <div className="flex flex-row justify-between items-center w-full">
          <div className="fz-14 color-000 fw-400">Earned</div>

          <div className="flex flex-row items-center gap-4">
            <img src={getImageUrl('@/assets/images/sequencer/avatar.svg')} className="s-13" />
            <div className="fz-14 fw-700 color-000">{earned}</div>
          </div>

        </div>
      </div>
    </SequencerStatusContainer>
  )
}
export default SequencerItemContainer