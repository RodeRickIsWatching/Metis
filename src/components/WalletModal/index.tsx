import { styled } from "styled-components";
import { Button } from "..";
import useAuth from "@/hooks/useAuth";
import { injectedConnector } from "@/configs/wallet";
import { filterHideText } from "@/utils/tools";
import React from "react";
import CheckSequencer from "../CheckSequencer";
import MyAccount from "../MyAccount";

const Container = styled.div`
  .f-14 {
    font-size: 14px;
    line-height: 21px;
  }

  .p-14-53 {
    padding: 14px 53px;
  }
`;

const WalletModal = () => {
  const { connect, isConnected, isConnecting, address } = useAuth(true);


  const [claimable, setClaimable] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const handleShow = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  const becomeSequencer = ()=>{
    handleShow()
    setClaimable(true)
  }

  const bridgeNow = ()=>{
    handleShow()
    setClaimable(false) 
  }

  return (
    <Container>
      <Button
        type="solid"
        onClick={() => {
          if (isConnecting || isConnected) {
            handleShow()
            return;
          }
          connect({ connector: injectedConnector });
        }}
      >
        <div className="p-14-53 flex flex-row items-center gap-10">
          <div className="f-14">
            {isConnected
              ? filterHideText(address as string, 8, 2)
              : isConnecting
              ? "Loading..."
              : "Connect Wallet"}
          </div>
        </div>
      </Button>



      <MyAccount
        visible={visible}
        claimable={claimable}
        onClose={handleClose}
        onOk={handleClose}
      />


    </Container>
  );
};

export default WalletModal;
