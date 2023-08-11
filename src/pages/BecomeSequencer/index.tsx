import * as React from "react";
import "./index.scss";
import { styled } from "styled-components";
import { catchError, getImageUrl } from "@/utils/tools";
import { useNavigate } from "react-router-dom";
import Progress from "@/components/Progress";
import { Button, Input } from "@/components";
import CopyAddress from "@/components/CopyAddress";
import useBalance from "@/hooks/useBalance";
import useAllowance from "@/hooks/useAllowance";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useBoolean } from "ahooks";
import Loading from "@/components/_global/Loading";
import useLock from "@/hooks/useLock";
import useAuth from "@/hooks/useAuth";
import { Address, useSignMessage } from "wagmi";
import { pubKey } from "@/configs/common";

const ColoredLabel = styled.div<{ color?: string }>`
  width: 226px;
  height: 71px;
  background: ${({ color }) => color || "#4369f7"};
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-family: Poppins-Bold, Poppins;
  font-weight: bold;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const sequencer = {
  title: "Join us as a sequencer",
  subTitle: "We can Make a More Secure,Decentralized,Effcient Ecosystem",
  children: [
    {
      img: getImageUrl("@/assets/images/_global/ic_Security@2x.png"),
      content: "Security and Trust",
    },
    {
      img: getImageUrl("@/assets/images/_global/ic_Decentralization@2x.png"),
      content: "Decentralization and Fairness",
    },
    {
      img: getImageUrl("@/assets/images/_global/ic_Incentive@2x.png"),
      content: "Incentive Alignment",
    },
    {
      img: getImageUrl("@/assets/images/_global/ic_Dynamic@2x.png"),
      content: "Dynamic Selection and Rotatiom",
    },

    {
      img: getImageUrl("@/assets/images/_global/ic_Network@2x.png"),
      content: "Network Participation and Governance",
    },
  ],
};

const section2 = {
  title: "And You Can Get",
  children: [
    {
      title: "Mining Rewards",
      content: `Sequencer nodes can earn Metis tokens as mining rewards for
      participating in block production and processing transactions
      on the network.`,
      img: getImageUrl("@/assets/images/_global/ic_MiningRewaeds.svg"),
    },
    {
      title: "Network Influence",
      content: `By participating in the consensus process as a sequencer node,
      you play an essential role in maintaining the network's security
      and stability.`,
      img: getImageUrl("@/assets/images/_global/ic_NetworkInfluence.svg"),
    },
    {
      title: "Early Adoption Advantage",
      content: `By participating in the initial stages of the sequencer pool,
      node operators can gain valuable experience and knowledge
      about the L2 ecosystem.`,
      img: getImageUrl("@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"),
    },
    {
      title: "Community Recognition",
      content: `This involvement can lead to increased recognition within the
      community, opening up potential collaboration and
      partnership opportunities.`,
      img: getImageUrl("@/assets/images/_global/ic_CommunityRecognition.svg"),
    },
  ],
};

const section3 = [
  {
    type: "L2 Transactions",
    color: "rgba(67, 105, 247, 1)",
    children: [
      {
        src: getImageUrl("@/assets/images/_global/tx@2x.png"),
        content: "TX",
        imgClassName: "w-56",
      },
      {
        src: getImageUrl("@/assets/images/_global/tx@2x.png"),
        content: "TX",
        imgClassName: "w-56",
      },
      {
        src: getImageUrl("@/assets/images/_global/tx@2x.png"),
        content: "TX",
        imgClassName: "w-56",
      },
      {
        src: getImageUrl("@/assets/images/_global/tx@2x.png"),
        content: "TX",
        imgClassName: "w-56",
      },
      {
        src: getImageUrl("@/assets/images/_global/tx@2x.png"),
        content: "...",
        imgClassName: "w-56",
        containerClassName: "flex-1",
      },
    ],
    nextBtns: [
      {
        src: getImageUrl("@/assets/images/_global/icc_down.svg"),
      },
    ],
  },
  {
    type: "L2 geth Layer",
    color: "rgba(24, 160, 196, 1)",
    children: [
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Producer 1",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl(
          "@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"
        ),
        imgClassName: "w-46",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Producer 2",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl(
          "@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"
        ),
        imgClassName: "w-46",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Producer 3",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl(
          "@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"
        ),
        imgClassName: "w-46",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Producer 4",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "...",
        imgClassName: "w-62",
        containerClassName: "flex-2",
      },
    ],
    nextBtns: [
      {
        content: "Submit L2 ovmed txs",
        src: getImageUrl("@/assets/images/_global/icc_down.svg"),
      },
      {
        content: "Fetch epoch and producer set",
        src: getImageUrl("@/assets/images/_global/icc_up.svg"),
      },
    ],
  },
  {
    type: "Pos Layer",
    color: "rgba(145, 96, 232, 1)",
    children: [
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Sequencer 1",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl(
          "@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"
        ),
        imgClassName: "w-46",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Sequencer 2",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl(
          "@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"
        ),
        imgClassName: "w-46",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Sequencer 3",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl(
          "@/assets/images/_global/ic_EarlyAdoptionAdvantage.svg"
        ),
        imgClassName: "w-46",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "Sequencer 4",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl("@/assets/images/_global/layer@2x.png"),
        content: "...",
        imgClassName: "w-62",
        containerClassName: "flex-2",
      },
    ],
    nextBtns: [
      {
        content: "Submit L2 ovmed txs",
        src: getImageUrl("@/assets/images/_global/icc_down.svg"),
      },
      {
        content: "Fetch epoch and producer set",
        src: getImageUrl("@/assets/images/_global/icc_up.svg"),
      },
    ],
  },
  {
    type: "L1 Ethereum",
    color: "rgba(197, 49, 242, 1)",
    children: [
      {
        src: getImageUrl("@/assets/images/_global/contract@2x.png"),
        content: "CTC",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl("@/assets/images/_global/contract@2x.png"),
        content: "SCC",
        imgClassName: "w-62",
      },
      {
        src: getImageUrl("@/assets/images/_global/contract@2x.png"),
        content: "Mining Contract",
        subContent: "Lock Metis to become a Sequencer",
        imgClassName: "w-62",
        containerClassName: "flex-2",
        needBorder: true,
        borderClassName: "sc3-box",
      },
    ],
  },
];

const section4 = [
  {
    index: "1",
    content: "Submit an Application",
  },
  {
    index: "2",
    content: "Initial Review",
  },
  {
    index: "3",
    content: "Community Voting",
  },
  {
    index: "4",
    content: "Final Selection and Onboarding",
  },
];

const section5 = {
  rows: [
    {
      title: "Q1",
      content: "A1",
    },
    {
      title: "Q2",
      content: "A2",
    },
    {
      title: "Q3",
      content: "A4",
    },
  ],
};

const Container = styled.section`
  margin-top: 56px;

  .gap-260 {
    gap: 260px;
  }
  .gap-58 {
    gap: 58px;
  }
  .gap-48 {
    gap: 48px;
  }
  .gap-55 {
    gap: 55px;
  }

  .gap-32 {
    gap: 32px;
  }

  .gap-64 {
    gap: 64px;
  }

  .half-w {
    width: 50%;
  }

  .p-0-72 {
    padding: 0px 72px;
  }

  .w-40 {
    width: 40px;
  }
  .w-56 {
    width: 56px;
  }
  .w-62 {
    width: 62px;
  }
  .w-72 {
    width: 72px;
  }
  .w-46 {
    width: 46px;
  }
  .w-137 {
    width: 137px;
  }
  .w-155 {
    width: 155px;
  }
  .mt-32 {
    margin-top: 32px;
  }

  .f-12 {
    font-size: 12px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #333347;
    line-height: 18px;
  }

  .f-20-bold {
    font-size: 20px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #313146;
    line-height: 30px;
  }

  .f-16-bold {
    font-size: 16px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #333347;
    line-height: 25px;
  }

  .f-28-bold {
    font-size: 28px;
    font-family: Poppins-ExtraBold, Poppins;
    font-weight: 800;
    color: #313146;
    line-height: 42px;
  }

  .f-16 {
    font-size: 16px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #333347;
    line-height: 25px;
  }

  .f-14 {
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #313146;
    line-height: 21px;
  }

  .mb-8 {
    margin-bottom: 8px;
  }
  .mb-24 {
    margin-bottom: 24px;
  }
  .mb-48 {
    margin-bottom: 48px;
  }

  .link-color {
    color: rgba(52, 109, 248, 1);
  }

  .f-20-bold {
    font-size: 20px;
    font-family: Poppins-ExtraBold, Poppins;
    font-weight: 800;
    color: #313146;
    line-height: 30px;
  }

  .avatar {
    width: 64px;
    height: 64px;
    background: #d8d8d8;
    border-radius: 50%;
  }

  .cards-container {
    .card {
      padding: 30px 32px;
      display: flex;
      align-items: center;
      gap: 25px;

      width: 480px;
      height: 148px;
      background: #ffffff;
      box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.05);
      border-radius: 24px;
    }
  }
`;

const message = 'test'

export function Component() {
  const { signMessageAsync } = useSignMessage({
    message: message,
  });

  const navigate = useNavigate();

  const { address, connector } = useAuth(true);

  const { balance } = useBalance();

  const [stakeAmount, setStakeAmount] = React.useState("");

  const { lockFor, relock, withdrawRewards, unlock, unlockClaim } = useLock();

  const { allowance, approve } = useAllowance();
  const [
    approveLoading,
    { setTrue: setApproveLoadingTrue, setFalse: setApproveLoadingFalse },
  ] = useBoolean(false);

  const needApprove = React.useMemo(
    () =>
      BigNumber(allowance || "0").lte(
        ethers.utils.parseEther(stakeAmount || "0").toString()
      ),
    [allowance, stakeAmount]
  );

  const handleApprove = async () => {
    const res = await approve();
    console.log("res", res);
  };

  const handleLockup = async () => {
    try {
      if (!allowance || needApprove) {
        setApproveLoadingTrue();
        await handleApprove();
        setApproveLoadingFalse();
        return;
      }

      setApproveLoadingTrue();

      // const signature = await signMessageAsync();

      // console.log('message, signature', message, signature)
      // const pubKey = ethers.utils.recoverPublicKey(ethers.utils.toUtf8Bytes(message), signature);

      // console.log('pubKey', pubKey)
      await lockFor({
        address: address as Address,
        amount: ethers.utils.parseEther(stakeAmount || "0").toString(),
        pubKey: pubKey as string,
      });
      setApproveLoadingFalse();
    } catch (e) {
      console.log(e)
      catchError(e);
      setApproveLoadingFalse();
    }
  };

  const jumpLink = () => {
    navigate("/sequencers");
  };

  const option = React.useMemo(() => {
    return [
      {
        name: "Newest",
        value: "0",
        label: "Newest",
      },
      {
        name: "Health",
        value: "1",
        label: "Health",
      },
    ];
  }, []);

  const [curOption, setCurOption] = React.useState(option?.[0]?.value);

  const onChange = (ele: any) => {
    setCurOption(ele?.value);
  };
  const sequencerCards = React.useMemo(() => {
    return [
      {
        name: "Sequencer Name",
        avatar: "",
        status: "HEALTH",
        color: "rgba(0, 218, 203, 1)",
        totalLockUp: "20,000 metis",
      },
      {
        name: "Sequencer Name",
        avatar: "",
        status: "Grace Period 1",
        color: "rgba(194, 119, 20, 1)",
        totalLockUp: "20,000 metis",
      },
      {
        name: "Sequencer Name",
        avatar: "",
        status: "Final Notice",
        color: "rgba(183, 27, 19, 1)",
        totalLockUp: "20,000 metis",
        offline: "19",
      },
      {
        name: "Sequencer Name",
        avatar: "",
        status: "HEALTH",
        color: "rgba(0, 218, 203, 1)",
        totalLockUp: "20,000 metis",
      },
    ];
  }, []);

  const col = [
    {
      index: "1",
      content: "Setup Sequencer",
    },
    {
      index: "2",
      content: "Sequencer details",
    },
    {
      index: "3",
      content: "Lock Metis",
    },
    {
      index: "4",
      content: "Completed",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState("1");

  const handleIndex = (index: string) => {
    setActiveIndex(index);
  };

  const step = React.useMemo(() => {
    switch (activeIndex) {
      case "1":
        return (
          <div className="flex flex-col">
            <span className="f-20-bold mb-8">Sequencer</span>
            <span className="f-14 mb-48">
              You can setup your Sequencer using any of the options from belows:
            </span>
            <div className="flex flex-row items-center gap-40 cards-container">
              <div className="card">
                <img
                  style={{ width: "88px", height: "88px" }}
                  src={getImageUrl("@/assets/images/_global/ic_Package.svg")}
                />
                <div className="flex flex-col gap-8">
                  <span className="f-16-bold">Package</span>
                  <span className="f-14">Set up Sequencer via package</span>
                </div>
              </div>
              <div className="card">
                <img
                  style={{ width: "88px", height: "88px" }}
                  src={getImageUrl("@/assets/images/_global/ic_Binaries.svg")}
                />
                <div className="flex flex-col gap-8">
                  <span className="f-16-bold">Binaries</span>
                  <span className="f-14">
                    Build from source to setup your Sequencer.
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-32 f-14" style={{ textAlign: "center" }}>
              If you have any question, please check our{" "}
              <a className="link-color" href="">
                developer documentation
              </a>{" "}
              or contact us through the{" "}
              <a className="link-color" href="">
                Telegram
              </a>{" "}
              or{" "}
              <a className="link-color" href="">
                Discord channel
              </a>
            </div>

            <div className="mt-72 flex flex-row items-center justify-center">
              <Button type="metis" onClick={() => handleIndex("2")}>
                <div style={{ width: "240px" }} className="p-18 f-14-bold">
                  Continue
                </div>
              </Button>
            </div>
          </div>
        );

      case "2":
        return (
          <div className="flex flex-col">
            <span className="f-20-bold mb-8">Sequencer details</span>
            <span className="f-14 mb-48">
              Please describe the basic information of your Sequencer
            </span>
            <div className="flex flex-row items-center gap-40 cards-container">
              <div
                className="card flex-wrap"
                style={{ width: "1000px", height: "312px", gap: "56px" }}
              >
                {/* avatar */}
                <div
                  className="flex-1 flex flex-row items-center gap-80"
                  style={{ minWidth: "calc(50% - 56px)" }}
                >
                  <div className="f-14 flex-2 no-wrap">Logo</div>
                  <div className="flex flex-row items-center justify-between gap-70">
                    <div className="avatar" />
                    <Button type="metis-solid">
                      <div style={{ padding: "14px 27px" }}>Upload</div>
                    </Button>
                  </div>
                </div>

                {/* name */}
                <div
                  className="flex-1 flex flex-row items-center gap-80"
                  style={{ minWidth: "calc(50% - 56px)" }}
                >
                  <div className="f-14 flex-2 no-wrap">Name</div>
                  <Input solid className="flex-3" />
                </div>

                {/* website */}
                <div
                  className="flex-1 flex flex-row items-center gap-80"
                  style={{ minWidth: "calc(50% - 56px)" }}
                >
                  <div className="f-14 flex-2 no-wrap">Website</div>
                  <Input solid className="flex-3" />
                </div>

                {/* addr */}
                <div
                  className="flex-1 flex flex-row items-center gap-80"
                  style={{ minWidth: "calc(50% - 56px)" }}
                >
                  <div className="f-14 flex-2 no-wrap">Signer's Address</div>
                  <Input solid className="flex-3" />
                </div>

                {/* desc */}
                <div
                  className="flex-1 flex flex-row items-center gap-80"
                  style={{ minWidth: "calc(50% - 56px)" }}
                >
                  <div className="f-14 flex-2 no-wrap">Description</div>
                  <Input solid className="flex-3" />
                </div>

                {/* public key */}
                <div
                  className="flex-1 flex flex-row items-center gap-80"
                  style={{ minWidth: "calc(50% - 56px)" }}
                >
                  <div className="f-14 flex-2 no-wrap">Signer's Public Key</div>
                  <Input solid className="flex-3" />
                </div>
              </div>
            </div>

            <div className="mt-64 flex flex-row items-center justify-center">
              <Button type="metis" onClick={() => handleIndex("3")}>
                <div style={{ width: "240px" }} className="p-18 f-14-bold">
                  Continue
                </div>
              </Button>
            </div>
          </div>
        );

      case "3":
        return (
          <div className="flex flex-col">
            <span className="f-20-bold mb-8">Add to Lockup</span>
            <span className="f-14 mb-48">
              You need at least 20,000 METIS to become a Sequencer
            </span>
            <div className="flex flex-row items-center gap-40 cards-container">
              <div
                className="card flex-wrap flex-col items-start"
                style={{ width: "560px", height: "285px", gap: "24px" }}
              >
                <div className="f-16 w-full" style={{ textAlign: "left" }}>
                  Stake
                </div>
                <div className="flex flex-row items-center gap-20 w-full">
                  <Input
                    className="flex-1"
                    solid
                    value={stakeAmount}
                    onChange={setStakeAmount}
                    max={balance?.readable || "0"}
                    suffix={
                      <div className="f-12" style={{ color: "#000" }}>
                        METIS
                      </div>
                    }
                  />
                  <Button type="metis" onClick={handleLockup}>
                    <div style={{ padding: "14px 34px" }}>
                      {approveLoading ? (
                        <Loading />
                      ) : (
                        <span>{needApprove ? "Approve" : "Lockup"}</span>
                      )}
                    </div>
                  </Button>
                </div>
                <div className="flex flex-col gap-16 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="f-14">Your Wallet Address</div>
                    <CopyAddress className={"f-14"} />
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="f-14">Your Blance</div>
                    <div className="f-14">{balance?.readable} MEITS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-64 flex flex-row items-center justify-center">
              <Button type="metis" onClick={() => handleIndex("4")}>
                <div style={{ width: "240px" }} className="p-18 f-14-bold">
                  Continue
                </div>
              </Button>
            </div>
          </div>
        );

      case "4":
        return (
          <div className="flex flex-col items-center gap-48">
            <div className="flex flex-col items-center gap-12">
              <div className="flex flex-col items-center">
                <img
                  style={{ width: "180px", height: "180px" }}
                  src={getImageUrl(
                    "@/assets/images/_global/ic_limits_of_authority.svg"
                  )}
                />
                <span className="f-20-bold">Congratulations！</span>
              </div>
              <span className="f-14">
                Your Sequencer has been setup successfully.
              </span>
            </div>
            <Button type="metis">
              <div style={{ padding: "18px 44px" }} className="f-14-bold">
                Check my Sequencer
              </div>
            </Button>
          </div>
        );
    }
  }, [
    activeIndex,
    stakeAmount,
    approveLoading,
    balance?.readable,
    needApprove,
  ]);

  return (
    <Container className="pages-landing flex flex-col gap-48 items-center">
      <div className="f-28-bold">Become a Sequencer</div>
      <Progress activeIndex={activeIndex} col={col} />
      <div className="mt-32">{step}</div>
    </Container>
  );
}

Component.displayName = "BecomeSequencer";
