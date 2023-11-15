import { Button, Input, Modal, message } from "@/components";
import CopyAddress from "@/components/CopyAddress";
import Loading from "@/components/_global/Loading";
import useLock from "@/hooks/useLock";
import useSequencerInfo from "@/hooks/useSequencerInfo";
import useUpdate from "@/hooks/useUpdate";
import { catchError } from "@/utils/tools";
import { useBoolean, useCountDown } from "ahooks";
import dayjs from "dayjs";
import { ethers } from "ethers";
import React, { useMemo } from "react";
import { styled } from "styled-components";

const Container = styled(Modal)`
  .f-12 {
    font-size: 12px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #333347;
    line-height: 18px;
  }
  .f-14 {
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #333347;
    line-height: 21px;
  }

  .f-14-bold {
    font-size: 14px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #333347;
    line-height: 21px;
  }

  .bg-dark {
    background: rgba(248, 248, 248, 1);
  }

  .radius-8 {
    border-radius: 8px;
  }

  .p-24 {
    padding: 24px;
  }

  .inside {
    width: 460px;
    .c {
      padding: 0 35px 35px;
    }
  }
`;

const WithdrawModal = ({
  visible,
  onOk,
  onClose,
}: {
  visible: boolean;
  onOk?: any;
  onClose?: any;
}) => {
  const { sequencerInfo } = useSequencerInfo();

  const lockedup = React.useMemo(
    () =>
      ethers.utils.formatEther(sequencerInfo?.sequencerLock || "0").toString(),
    [sequencerInfo?.sequencerLock]
  );

  const unlockTo = useMemo(
    () =>
      dayjs
        .unix(sequencerInfo?.unlockClaimTime || 0)
        .format("YYYY-MM-DD HH:mm:ss"),
    [sequencerInfo?.unlockClaimTime]
  );

  const [countdown, formattedRes] = useCountDown({
    targetDate: unlockTo,
  });

  const { unlockClaim } = useLock();
  const { sequencerId } = useUpdate();

  const [withdrawLoading, { setTrue, setFalse }] = useBoolean(false);

  const handleWithdraw = async () => {
    if (!!countdown) return;
    try {
      setTrue();
      await unlockClaim({
        sequencerId,
        withdrawRewardToL2: false,
      });
      setFalse();
    } catch (e) {
      setFalse();
      // message.error(catchError(e));
    }
  };

  return (
    <Container
      visible={visible}
      onCancel={onClose}
      onClose={onClose}
      onOk={onOk}
      title="Withdraw Your METIS Locked"
      middleHeader
    >
      <div className="c flex flex-col gap-24">
        <div
          className="flex flex-col p-24 gap-12 items-center bg-dark radius-8"
          style={{ padding: "40px" }}
        >
          <span className="f-14-bold">{lockedup} metis</span>
          {+sequencerInfo?.unlockClaimTime ? (
            <span className="">Unlock Until: {unlockTo}</span>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-20">
          <Button
            disabled={!!countdown || !+sequencerInfo?.unlockClaimTime || !+lockedup || withdrawLoading}
            style={{ padding: "14px 50px" }}
            type="metis"
            className="flex-1"
            onClick={handleWithdraw}
          >
            {withdrawLoading ? <Loading  color="#fff"/> : "Confirm"}
          </Button>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-row items-center justify-between">
            <span className="f-14">Your Wallet Address</span>
            <CopyAddress className={"f-14"} />
          </div>
        </div>
      </div>
    </Container>
  );
};
export default WithdrawModal;
