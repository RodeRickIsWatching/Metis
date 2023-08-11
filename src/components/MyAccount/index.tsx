import { styled } from "styled-components";
import { Button, Modal } from "..";
import { getImageUrl } from "@/utils/tools";
import CheckSequencer from "../CheckSequencer";
import React from "react";
import CopyAddress from "../CopyAddress";
import useAuth from "@/hooks/useAuth";
import useBalance from "@/hooks/useBalance";

const Container = styled(Modal)`
  .inside {
    .p-14-45 {
      padding: 14px 45px;
    }

    .f-14-bold {
      font-size: 14px;
      font-family: Poppins-Bold, Poppins;
      font-weight: bold;
      color: #333347;
      line-height: 21px;
    }
    .avatar {
      width: 32px;
      height: 32px;
      background: #d8d8d8;
      border-radius: 50%;
    }
    .f-12 {
      font-size: 12px;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #333347;
      line-height: 18px;
    }

    .header {
      display: flex;
      justify-content: center;
      position: relative;
      .close {
        position: absolute;
        right: 24px;
        width: 24px;
        height: 24px;
      }
    }
    .content {
      padding: 0 30px 30px;
    }

    .connected {
      .component-button {
        width: 74px;
        height: 32px;
        background: rgba(0, 218, 203, 0.2);
        border-radius: 8px;
        span {
          color: rgba(0, 218, 203, 1);
        }
      }
    }

    .cards {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      width: 440px;

      .f-12 {
        font-size: 12px;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #333347;
        line-height: 18px;
      }

      .f-14-bold {
        font-size: 14px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #333347;
        line-height: 21px;
      }

      .f-14 {
        font-size: 14px;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #00dacb;
        line-height: 21px;
      }

      .card-item {
        position: relative;
        flex: 1;
        min-width: 180px;
        height: 120px;
        background: #f8f8f8;
        border-radius: 8px;

        .claimable {
          position: absolute;
          bottom: 0;
          background: rgba(0, 218, 203, 0.1);
          border-radius: 0px 0px 8px 8px;
          padding: 9px 0;
        }
      }
    }
  }
`;

const MyAccount = ({
  visible,
  onClose,
  onOk,
  claimable,
}: {
  visible: boolean;
  onClose?: any;
  onOk?: any;
  claimable?: boolean;
}) => {

  const {address} = useAuth(true)

  const { balance } = useBalance();

  const [checkSequencerVisible, setCheckSequencerVisible] =
    React.useState(false);
  const handleClose = () => {
    setCheckSequencerVisible(false);
  };
  const handleOk = () => {
    setCheckSequencerVisible(true);
  };
  const handleShow = ()=>{
    setCheckSequencerVisible(true);
  }
  return (
    <>
      <Container
        visible={visible}
        onClose={onClose}
        onOk={onOk}
        title="My Account"
      >
        <div className="flex flex-col gap-32">
          <div className="connected flex flex-col gap-16">
            <span className="f-12">Connected with Nuvo</span>
            <div className="flex flex-row items-center gap-32">
              <div className="flex flex-row items-center gap-12">
                <div className="avatar" />
                <span className="f-12">
                  {address}
                </span>
              </div>

              <Button>
                <span className="f-12">Change</span>
              </Button>
            </div>

            <div className="flex flex-row items-cneter gap-20">
              {/* copy */}
              <CopyAddress addr="Copy Address" className={"f-12"} reverse/>

              {/* Etherscan */}
              <div className="copy flex flex-row items-center gap-6 pointer">
                <img
                  src={getImageUrl("@/assets/images/_global/ic_Etherscan.svg")}
                />
                <span className="f-12">Etherscan</span>
              </div>

              {/* Andromeda-explore */}
              <div className="copy flex flex-row items-center gap-6 pointer">
                <img
                  src={getImageUrl("@/assets/images/_global/ic_Etherscan.svg")}
                />
                <span className="f-12">Andromeda-explore</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-24 items-center">
            <div className="cards">
              <div className="card-item flex flex-col gap-12 items-center justify-center">
                <span className="f-12" style={{ marginTop: "-18px" }}>
                  Wallet Balance
                </span>
                <span className="f-14-bold">{balance?.readable} metis</span>
                {claimable ? (
                  <div className="claimable f-14 w-full flex flex-row items-center justify-center pointer">
                    Claim
                  </div>
                ) : null}
              </div>
              <div className="card-item flex flex-col gap-12 items-center justify-center">
                <span className="f-12" style={{ marginTop: "-18px" }}>
                  Wallet Balance
                </span>
                <span className="f-14-bold">{balance?.readable} metis</span>
                {claimable ? (
                  <div className="claimable f-14 w-full flex flex-row items-center justify-center pointer">
                    Claim
                  </div>
                ) : null}
              </div>
              <div className="card-item flex flex-col gap-12 items-center justify-center">
                <span className="f-12" style={{ marginTop: "-18px" }}>
                  Wallet Balance
                </span>
                <span className="f-14-bold">{balance?.readable} metis</span>
                {claimable ? (
                  <div className="claimable f-14 w-full flex flex-row items-center justify-center pointer">
                    Claim
                  </div>
                ) : null}
              </div>
            </div>
            <Button type="metis" onClick={handleShow}>
              <div className="p-14-45 f-14-bold">Check My Sequencer</div>
            </Button>
          </div>
        </div>
      </Container>

      <CheckSequencer
        invalid={Math.random() > 0.5}
        visible={checkSequencerVisible}
        onClose={handleClose}
        onOk={handleOk}
      />
    </>
  );
};
export default MyAccount;
