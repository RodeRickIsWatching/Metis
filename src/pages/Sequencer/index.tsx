import * as React from "react";
import "./index.scss";
import { styled } from "styled-components";
import { getImageUrl } from "@/utils/tools";
import { Button, Input, Select, Tooltip } from "@/components";
import { useNavigate } from "react-router-dom";
import useUpdate from "@/hooks/useUpdate";

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

  .f-12-sc3 {
    font-size: 11px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #313146;
    line-height: 17px;
  }

  .f-16-sc3 {
    font-size: 16px;
    font-family: Poppins-Bold, Poppins;
    font-weight: bold;
    color: #313146;
    line-height: 25px;
  }

  .mb-24 {
    margin-bottom: 24px;
  }

  .top-banner {
    padding: 64px 0 48px;

    .f-28 {
      font-size: 28px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #313146;
      line-height: 40px;
    }

    .f-16 {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #313146;
      line-height: 22px;
    }

    .f-16-bold {
      font-size: 16px;
      font-family: Poppins-SemiBold, Poppins;
      font-weight: 600;
      line-height: 25px;
    }

    .p-18-26 {
      padding: 18px 26px;
    }

    .top-content {
      max-width: 1440px;
      width: 100vw;
      padding: 0 110px;
      margin: auto;
      h1 {
        font-size: 56px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #313146;
        line-height: 85px;
      }
      h2 {
        font-size: 28px;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #313146;
        line-height: 42px;
      }
      button.primary {
        background: #00d2c1;
        border-radius: 36px;
        width: fit-content;
        span {
          padding: 22px 52px;
          font-size: 20px;
          font-family: Poppins-SemiBold, Poppins;
          font-weight: 600;
          color: #313146;
          line-height: 30px;
        }
      }

      .opacity-card {
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.5) 0%,
          rgba(242, 250, 255, 0.3) 100%
        );
        box-shadow: inset 0px 0px 30px 0px #ffffff;
        border-radius: 16px;
        backdrop-filter: blur(10px);
        padding: 32px;
      }
    }

    position: relative;
    background: url(${getImageUrl("@/assets/images/_global/img-2@2x.png")}),
      linear-gradient(
        270deg,
        #00d2c122 0%,
        rgba(0, 210, 193, 0) 50%,
        #00d2c122 100%
      );
    background-repeat: no-repeat;
    /* aspect-ratio: 1440 / 560; */
    width: 100vw;
    background-position: center;
    background-size: cover;
  }

  .f-20-bold {
    font-size: 20px;
    font-family: Poppins-ExtraBold, Poppins;
    font-weight: 800;
    color: #313146;
    line-height: 30px;
  }

  .sc1 {
    max-width: 1200px;
    margin: 54px auto;
    .f-14-bold {
      font-size: 14px;
      font-family: Poppins-SemiBold, Poppins;
      font-weight: 600;
      color: #313146;
      line-height: 21px;
    }

    .f-18-bold {
      font-size: 18px;
      font-family: Poppins-Bold, Poppins;
      font-weight: bold;
      color: #313146;
      line-height: 27px;
    }
    .f-14 {
      font-size: 14px;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #313146;
      line-height: 21px;
    }

    .ptb-28 {
      padding: 28px 0;
    }

    .mb-24 {
      margin-bottom: 24px;
    }

    .basic-card {
      & > div:not(:last-of-type) {
        border-right: 1px solid #efefef;
      }
    }
  }

  .sc2 {
    max-width: 1200px;
    margin: 54px auto;

    .search-container {
      .component-select {
        /* width: 200px; */
        height: 56px;
        border-radius: 28px;
        border: 1px solid #313144;
        padding: 18px 28px;
        color: rgba(49, 49, 70, 1);
      }
      .component-input {
        width: 200px;
        height: 56px;
        border-radius: 28px;
        border: 1px solid #313144;
        padding: 18px 28px;
        overflow: hidden;

        input {
          font-size: 14px;
          font-family: Poppins-Regular, Poppins;
          font-weight: 400;
          color: #333347;
          line-height: 21px;
        }
      }
    }
    .sequencer-cards {
      display: flex;
      align-items: center;
      /* justify-content: center; */
      gap: 21px;
      .sequencer-card {
        position: relative;
        width: 386px;
        height: 288px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.05);
        border-radius: 24px;
        padding: 32px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        .warning {
          z-index: 2;
          width: 100%;
          padding: 8px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(183, 27, 19, 0.1);
          border-radius: 0px 0px 24px 24px;
          position: absolute;
          bottom: 0;
          span {
            color: rgba(183, 27, 19, 1);
          }
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

        .f-16-bold {
          font-size: 16px;
          font-family: Poppins-SemiBold, Poppins;
          font-weight: 600;
          color: #333347;
          line-height: 25px;
        }

        .avatar {
          width: 72px;
          height: 72px;
          background: #d0baf5;
          border-radius: 50%;
        }
      }
    }
  }
`;

export function Component() {
  const navigate = useNavigate();
  const jumpLink = () => {
    navigate("/becomeSequencer");
  };

  const jumpSequencer = (id: string) => {
    navigate(`/sequencers/${id}`);
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
        id: 1,
      },
      {
        name: "Sequencer Name",
        avatar: "",
        status: "Grace Period 1",
        color: "rgba(194, 119, 20, 1)",
        totalLockUp: "20,000 metis",
        id: 2,
      },
      {
        name: "Sequencer Name",
        avatar: "",
        status: "Final Notice",
        color: "rgba(183, 27, 19, 1)",
        totalLockUp: "20,000 metis",
        offline: "19",
        id: 3,
      },
      {
        name: "Sequencer Name",
        avatar: "",
        status: "HEALTH",
        color: "rgba(0, 218, 203, 1)",
        totalLockUp: "20,000 metis",
        id: 4,
      },
    ];
  }, []);


  const {sequencerTotalInfo} = useUpdate()
  console.log('sequencerTotalInfo', sequencerTotalInfo)

  return (
    <Container className="pages-landing flex flex-col ">
      <div className="top-banner">
        {/* <img src={getImageUrl()}/> */}
        <div className="top-content flex flex-col gap-58 ">
          <div className="gap-48 flex flex-col">
            <div className="gap-16 flex flex-col">
              <h1>Become a Metis Sequencer and Mining Rewards</h1>
              <h2>Become a Metis Sequencer and Mining Rewards</h2>
            </div>
            <div className="flex flex-row items-center gap-16">
              <Button onClick={jumpLink} type="dark">
                <div className="p-18-26 f-16-bold">Become a Sequencer</div>
              </Button>
              <Button onClick={jumpLink} type="light">
                <div className="p-18-26 f-16-bold">Bridge Now</div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="sc1  w-full">
        <div className="f-20-bold mb-24">Network Overview</div>
        <div className="basic-card flex flex-row ptb-28 w-full">
          {/* tvl */}
          <div className="flex-1 flex flex-col items-center gap-20 ">
            <div className="flex flex-row items-center gap-6">
              <div className="f-14-bold">TVL</div>
              <Tooltip title={<span>Tooltip</span>}>
                <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
              </Tooltip>
            </div>
            <div className="f-18-bold">{sequencerTotalInfo?.currentSequencerSetTotalLockReadable || '-'} Metis</div>
            <div className="f-14">${'-'}</div>
          </div>

          {/* TOTAL SEQUENCERS */}
          <div className="flex-1 flex flex-col items-center gap-20">
            <div className="flex flex-row items-center gap-6">
              <div className="f-14-bold">TOTAL SEQUENCERS</div>
              <Tooltip title={<span>Tooltip</span>}>
                <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
              </Tooltip>
            </div>
            <div className="f-18-bold">{sequencerTotalInfo?.currentSequencerSetSize || '-'}</div>
          </div>

          {/* TOTAL REWARDS DISTRIBUTED */}
          <div className="flex-1 flex flex-col items-center gap-20">
            <div className="flex flex-row items-center gap-6">
              <div className="f-14-bold">TOTAL REWARDS DISTRIBUTED</div>
              <Tooltip title={<span>Tooltip</span>}>
                <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
              </Tooltip>
            </div>
            <div className="f-18-bold">{'-'} Metis</div>
            <div className="f-14">${'-'}</div>
          </div>

          {/* ANDROMEDA BLOCK HEIGHT */}
          <div className="flex-1 flex flex-col items-center gap-20">
            <div className="flex flex-row items-center gap-6">
              <div className="f-14-bold">ANDROMEDA BLOCK HEIGHT</div>
              <Tooltip title={<span>Tooltip</span>}>
                <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
              </Tooltip>
            </div>
            <div className="f-18-bold">{'-'} Metis</div>
            <div className="f-14">${'-'}</div>
          </div>
        </div>
      </div>

      <div className="sc2 w-full">
        <div className="flex flex-row items-center justify-between">
          <div className="f-20-bold mb-24">Sequencer</div>
          <div className="flex flex-row gap-24 search-container">
            <Input
              suffix={
                <img
                  style={{ width: "21px", height: "21px" }}
                  src={getImageUrl("@/assets/images/_global/ic_SEARCH.svg")}
                />
              }
            />
            <Select
              type="light"
              options={option}
              placement="right"
              value={curOption}
              allowClear={false}
              onChange={(ele) => {
                onChange?.(ele);
              }}
            />
          </div>
        </div>
        <div className="sequencer-cards flex flex-row ptb-28 flex-wrap ">
          {sequencerCards.map((i, index) => (
            <div
              className="sequencer-card pointer"
              key={index}
              onClick={() => {
                jumpSequencer(i.id);
              }}
            >
              <div className="flex flex-col gap-12 items-center">
                <div className="avatar" />
                <div className="f-16-bold">{i.name}</div>
              </div>

              <div className="flex flex-col gap-16 items-center w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="f-14">HEALTH STATUS</span>
                  <span className="f-14-bold" style={{ color: i.color }}>
                    {i.status}
                  </span>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                  <span className="f-14">Total lock-up</span>
                  <span className="f-14-bold">{i.totalLockUp}</span>
                </div>
              </div>

              {i.offline ? (
                <div className="warning">
                  <span className="f-14">
                    Offline Since {i.offline} Checkpoints
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

Component.displayName = "Sequencer";
