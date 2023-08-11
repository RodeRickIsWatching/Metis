import * as React from "react";
import "./index.scss";
import { styled } from "styled-components";
import { getImageUrl } from "@/utils/tools";
import { Button, Tooltip } from "@/components";
import Faq from "react-faq-component";
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

    background: url(${getImageUrl(
        "@/assets/images/_global/home_top_banner.png"
      )}),
      linear-gradient(
        270deg,
        #00d2c122 0%,
        rgba(0, 210, 193, 0) 50%,
        #00d2c122 100%
      );
    /* aspect-ratio: 1440 / 560; */
    width: 100vw;
    background-position: center;
    background-size: contain;
  }

  .main-section {
    padding-top: 64px;
    padding-bottom: 64px;

    &.dark {
      background: rgba(246, 249, 253, 1);
    }

    .f-40 {
      font-size: 40px;
      font-family: Poppins;
      font-weight: 900;
      color: #313146;
      line-height: 60px;
    }

    .f-16 {
      font-size: 16px;
      font-family: Poppins;
      font-weight: 400;
      color: #313146;
      line-height: 25px;
    }

    .f-14 {
      font-size: 14px;
      font-family: Poppins;
      font-weight: 900;
      color: #313146;
      line-height: 21px;
    }

    .f-20 {
      font-size: 20px;
      font-family: Poppins-Bold, Poppins;
      font-weight: bold;
      color: #313146;
      line-height: 30px;
    }

    .mw-150 {
      max-width: 150px;
    }

    .align-center {
      text-align: center;
    }

    .section2-item {
      width: calc(50% - 32px);
      padding: 22px 42px;
      &:nth-of-type(odd){
        justify-content: flex-end;
      }
    }

    .mw-436 {
      max-width: 436px;
    }
  }

  .sc3 {
    width: 100vw;
    max-width: 1200px;
    margin: auto;
    .overall-container {
      height: 200px;
      background: rgba(241, 243, 249, 0.5);
      border-radius: 8px;
      border: 1px solid #edeff7;
      &:last-of-type {
        height: 280px;
      }
    }
    .colored-label {
      position: absolute;
      top: 0%;
      left: 0%;
      transform: translate(0, -50%);
    }
    .sc3-box {
      background: linear-gradient(180deg, #ffffff 0%, #f8f9fc 100%);
      border-radius: 32px;
      width: 240px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .sc4 {
    .progress-bar {
      position: relative;
      width: 1000px;
      margin: auto;
    }
    .bar {
      width: 100%;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      height: 24px;
      background: #e8f1fb;
      border-radius: 26px;
      z-index: -1;
    }
    .index {
      width: 42px;
      height: 42px;
      min-height: 42px;
      background: #ffffff;
      border: 4px solid #e8f1fb;
      border-radius: 50%;

      font-size: 16px;
      font-family: Poppins-Bold, Poppins;
      font-weight: bold;
      color: #313146;
      line-height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .c {
      height: 90px;
      &.c-0 {
        align-items: flex-start;
        span {
          transform: translate(-50%, 0);
        }
      }
      &.c-1 {
        flex: 2;
      }
      &.c-2 {
        flex: 2;
      }
      &:last-of-type {
        align-items: flex-end;
        span {
          transform: translate(50%, 0);
        }
      }
    }
    .submit {
      margin: auto;
      width: 224px;
      height: 58px;
      background: #00d2c1;
      border-radius: 29px;
      span {
        font-size: 16px;
        font-family: Poppins-SemiBold, Poppins;
        font-weight: 600;
        color: #313146;
        line-height: 25px;
      }
    }
  }

  .sc5 {
    .faq-row-wrapper {
      width: 610px;
      margin: auto;
      background: transparent;
      .faq-body {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .faq-row {
        position: relative;
        .icon-wrapper {
          top: 50%;
          transform: translate(0, -50%);
        }
        border-radius: 16px;
        border: none;
        background-color: #fff;
        padding: 0 40px;

        .row-title,
        .row-content-text {
          height: 80px;
        }
        .row-content-text {
          display: flex;
          align-items: center;
        }

        .row-title-text,
        .row-content-text {
          font-size: 20px;
          font-family: Poppins-Bold, Poppins;
          font-weight: bold;
          color: #313146;
          line-height: 30px;
        }
      }
    }
  }
`;

export function Component() {


  const navigate = useNavigate()
  const jumpLink = ()=>{
    navigate('/sequencers')
  }

  const { sequencerTotalInfo } = useUpdate()

  return (
    <Container className="pages-landing flex flex-col ">
      <div className="top-banner">
        <div className="top-content flex flex-col gap-58">
          <div className="gap-48 flex flex-col">
            <div className="gap-16 flex flex-col">
              <h1>Metis Sequencer Mining</h1>
              <h2>Become a Metis Sequencer and Mining Rewards</h2>
            </div>
            <Button onClick={jumpLink} type="primary">Become a Sequencer</Button>
          </div>

          <div className="flex flex-row items-center gap-48">
            <div className="opacity-card flex flex-col items-center gap-12">
              <span className="f-28">{sequencerTotalInfo?.currentSequencerSetTotalLockReadable || '-'} </span>

              <div className="flex items-center gap-8">
                <span className="f-16">Total METIS locked</span>
                <Tooltip title={
                  <span>The expected annualized return, which we<br/> periodically update to ensure that the mining<br/> yield approaches 20%.</span>
                }>
                  <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
                </Tooltip>
              </div>
            </div>
            <div className="opacity-card flex flex-col items-center gap-12">
              <span className="f-28">20%</span>
              <div className="flex items-center gap-8">
                <span className="f-16">Expected APR</span>
                <Tooltip title={
                  <span>The expected annualized return, which we<br/> periodically update to ensure that the mining<br/> yield approaches 20%.</span>
                }>
                  <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
                </Tooltip>
              </div>
            </div>
            <div className="opacity-card flex flex-col items-center gap-12">
              <span className="f-28">20%</span>
              <div className="flex items-center gap-8">
                <span className="f-16">Current APR</span>
                <Tooltip title={
                  <span>The expected annualized return, which we<br/> periodically update to ensure that the mining<br/> yield approaches 20%.</span>
                }>
                  <img src={getImageUrl("@/assets/images/_global/ic_q.svg")} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-section flex flex-col gap-64">
        <div className="flex flex-col gap-12 items-center">
          <span className="f-40">{sequencer.title}</span>
          <span className="f-16">{sequencer.subTitle}</span>
        </div>
        <div className="flex flex-row items-center gap-55 justify-center">
          {sequencer.children.map((i) => (
            <div
              className="gap-32 flex flex-col items-center wrap"
              key={i.content}
            >
              <img src={i.img} />
              <span className="f-14 mw-150 align-center">{i.content}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="main-section dark flex flex-col gap-64">
        <div className="flex flex-col gap-12 items-center">
          <span className="f-40">{section2.title}</span>
        </div>
        <div className="flex flex-row items-center gap-55 justify-center p-0-72 flex-wrap">
          {section2.children.map((i) => (
            <div
              className="gap-32 flex flex-row wrap items-start section2-item wrap"
              style={{ maxWidth: "calc(50% - 32px)" }}
              key={i.content}
            >
              <img src={i.img} />
              <div className="flex flex-col gap-14 ">
                <span className="f-20">{i.title}</span>
                <span className="f-14 mw-436">{i.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequencer */}
      <div className="sc3 main-section flex flex-col gap-64">
        <div className="flex flex-col gap-12 items-center">
          <span className="f-40">
            Decentralized Sequencer Overall Architecture
          </span>
        </div>
        <div className="flex flex-col gap-20 ">
          {section3.map((i, index) => (
            <div className="flex flex-col gap-20 items-center" key={index}>
              <div className="relative overall-container w-full flex flex-row items-center justify-center">
                <ColoredLabel
                  className="colored-label self-start"
                  color={i.color}
                >
                  {i.type}
                </ColoredLabel>
                {i.children.map((j, jndex) =>
                  j?.needBorder ? (
                    <div
                      style={{ height: "200px" }}
                      className={`flex flex-col gap-12 flex-1 items-center ${
                        j?.containerClassName || ""
                      }`}
                      key={jndex}
                    >
                      <div
                        className={`flex flex-col gap-12 flex-1 items-center ${
                          j?.borderClassName || ""
                        }`}
                      >
                        <img className={j.imgClassName} src={j.src} />
                        {j?.content ? (
                          <div className={`flex flex-col gap-4 items-center`}>
                            <span className="f-16-sc3">{j?.content}</span>
                            <span className="w-155 f-12-sc3 align-center">
                              {j?.subContent}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col gap-12 flex-1 items-center  ${
                        j?.containerClassName || ""
                      }`}
                      key={jndex}
                    >
                      <img className={j.imgClassName} src={j.src} />
                      {j?.content ? (
                        <div className={`flex flex-col gap-4 items-center`}>
                          <span className="f-16-sc3">{j?.content}</span>
                          <span className="w-155 f-12-sc3 align-center">
                            {j?.subContent}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  )
                )}
              </div>
              {i?.nextBtns?.length ? (
                <div className="flex flex-row items-center gap-260">
                  {i?.nextBtns?.map((j, jndex) => (
                    <div
                      className="flex flex-row items-center gap-24"
                      key={jndex}
                    >
                      <img className="w-137" src={j.src} />
                      {j?.content ? (
                        <span className="w-72 f-12-sc3">{j?.content}</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* waitinglist campagin */}
      <div className="sc4 main-section flex flex-col gap-64">
        <div className="flex flex-col gap-12 items-center">
          <span className="f-40">Whitelisting Campaign</span>
        </div>

        <div className="progress-bar flex flex-row items-center">
          <div className="bar" />
          {section4.map((i, index) => (
            <div
              key={i.index}
              className={`c flex-1 flex flex-col items-center gap-16 c-${index}`}
            >
              <div className="index">{i.index}</div>
              <span>{i.content}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "80px" }}>
          <Button className="submit">Submit Now</Button>
        </div>
      </div>

      {/* FAQ */}
      <div
        style={{ paddingBottom: "80px" }}
        className="sc5 main-section dark flex flex-col gap-64"
      >
        <div className="flex flex-col gap-12 items-center">
          <span className="f-40">FAQ</span>
        </div>
        <div className="flex flex-row items-center gap-55 justify-center p-0-72 flex-wrap">
          <Faq
            data={section5}
            // styles={styles} config={config}
          />
        </div>
      </div>
    </Container>
  );
}

Component.displayName = "Home";
