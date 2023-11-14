/* eslint-disable max-len */
import * as React from 'react';
import './index.scss';
import { styled } from 'styled-components';
import { getImageUrl, jumpLink } from '@/utils/tools';
import { Button, Input } from '@/components';
import Faq from 'react-faq-component';
import { useNavigate } from 'react-router-dom';
import useUpdate from '@/hooks/useUpdate';
import Progress from '@/components/Progress';
import SequencerItemContainer from '@/components/SequencerItemContainer';
import { useRequest } from 'ahooks';
import fetchOverview from '@/graphql/overview';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { defaultExpectedApr } from '@/configs/common';

const ColoredLabel = styled.div<{ color?: string }>`
  width: 226px;
  height: 71px;
  background: ${({ color }) => color || '#4369f7'};
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

const section2 = {
  title: 'Benefits',
  children: [
    {
      title: 'For the Network',
      gradient: 'linear-gradient(110deg, #9E32F7 0%, #01498D 174.15%)',
      children: [
        {
          title: 'Decentralization',
          content:
            'By participating in the consensus process, Sequencers play an essential role in maintaining the network’s decentralization, transparency and stability.',
          img: getImageUrl('@/assets/images/_global/decentralization.svg'),
        },
        {
          title: 'Security',
          content:
            'With multiple nodes or entities participating in sequencing, it becomes more challenging for malicious actors to control or compromise the order of transactions.',
          img: getImageUrl('@/assets/images/_global/security.svg'),
        },
      ],
    },
    {
      title: 'For the Sequencer',
      gradient: 'linear-gradient(147deg, #593CC8 19.75%, #01498D 100%)',
      children: [
        {
          title: 'Rewards',
          content:
            'Sequencer nodes have the opportunity to earn METIS tokens as rewards for their role in block production and transaction processing within the network.',
          img: getImageUrl('@/assets/images/_global/rewards.svg'),
        },
        {
          title: 'Community',
          content:
            'Active participation can increase recognition within the community, creating possibilities for future collaborations and potential partnerships.',
          img: getImageUrl('@/assets/images/_global/community.svg'),
        },
      ],
    },
  ],
};

const section4 = [
  {
    index: '1',
    content: 'Submit an Application',
  },
  {
    index: '2',
    content: 'Initial Review',
  },
  {
    index: '3',
    content: 'Community Voting',
  },
  {
    index: '4',
    content: 'Final Selection and Onboarding',
  },
];

const section5 = {
  rows: [
    {
      title: 'How does the sequencer work?',
      content: (
        <span className="flex flex-col gap-4">
          <span>1. Users initiate transactions.</span>
          <span>2. The transaction is sent to sequencer nodes in the network.</span>
          <span>3. The sequencer is responsible for collecting the transaction and packaging into a block.</span>
          <span>
            4. This block is then aggregated by MPC (Multi-Party Computation) nodes and submitted to the Ethereum main
            chain for the final confirmation of the transaction.
          </span>
        </span>
      ),
    },
    {
      title: 'How can I run a sequencer?',
      content: (
        <span>
          Please visit the{' '}
          <span className='underlined pointer' onClick={() => jumpLink('https://forms.gle/Ut5A8PqeaVZC9awa6', '_blank')}>
            Sequencer Whitelist Application
          </span>{' '}
          form to apply. Once you have filled out the form, we will get in touch with you.
        </span>
      ),
    },
    {
      title: 'What hardware do I need to run a sequencer?',
      content: (
        <span className="flex flex-col gap-4">
          <span>CPU: 16-core</span>
          <span>RAM: 32 GB</span>
          <span>Storage: 1 TB SSD</span>
        </span>
      ),
    },
  ],
};

const Container = styled.section`
  .half-w {
    width: 50%;
  }

  .p-0-72 {
    padding: 0px 72px;
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
    padding: 0px 0 48px;

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
    }

    background: url(${getImageUrl('@/assets/images/_global/home_top_banner.png')});
    /* aspect-ratio: 1440 / 560; */
    width: 100vw;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    padding-bottom: 220px;
    position: relative;
    .info-card-container {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      .opacity-card {
        box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
        background: #fff;
        border-radius: 16px;
        backdrop-filter: blur(10px);
        padding: 23px;
        gap: 4px;
      }
    }
  }

  .main-section {
    padding-top: 64px;
    padding-bottom: 64px;
    &.main-section-2 {
      background: url(${getImageUrl('@/assets/images/_global/main_section_2.png')}), lightgray 50% / cover no-repeat;
      background-size: cover;
      /* filter: blur(100px); */
    }
    &.main-section-4 {
      background: linear-gradient(95deg, #aa30ff 5.57%, #00498c 96.09%);
    }

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
      width: calc(50%-32px);
      padding: 22px 42px;
      &:nth-of-type(odd) {
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
      top: calc(50% + 10px);
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
        gap: 4px;
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
          /* height: 80px; */
        }
        .row-content-text {
          display: flex;
          align-items: center;
        }

        .row-title-text,
        .row-content-text {
          font-size: 26px;
          font-weight: 400;
          font-family: Raleway;
          color: #000;
          line-height: 32px;
        }
       .row-content-text{
        font-size: 20px!important;
        line-height: 22px;
       } 
      }
    }
  }
`;

const Section2CardTemplate = ({ title, img, content }: { title?: string; img?: string; content?: string }) => {
  return (
    <div className="gap-32 flex flex-row wrap items-start maxw-520">
      {img ? <img className="w-52 h-60" src={img} /> : null}
      <div className="flex flex-col gap-6 ">
        {title ? <span className="fz-22 fw-700 raleway color-fff">{title}</span> : null}
        {content ? <span className="fz-18 fw-400 inter color-fff">{content}</span> : null}
      </div>
    </div>
  );
};

export function Component() {
  const navigate = useNavigate();
  const jumpLink = () => {
    navigate('/becomeSequencer');
  };
  

  const { sequencerTotalInfo } = useUpdate();

  const jumpSequencer = (id: string) => {
    navigate(`/sequencers/${id}`);
  };

  const { data, loading } = useRequest(fetchOverview);

  const sequencerCards = React.useMemo(() => {
    if (!data?.lockedUserParams) return [];
    return data?.lockedUserParams?.map((i) => ({
      name: '1',
      avatar: '1',
      status: 'HEALTH',
      color: 'rgba(0, 218, 203, 1)',
      totalLockUp: '20,000 metis',
      id: i.address,
      ...i,
    }));
  }, [data]);

  return (
    <Container className="pages-landing flex flex-col ">
      <div className="top-banner">
        <div className="top-content flex flex-col gap-58 mt-100">
          <div className="gap-48 flex flex-col">
            <div className="gap-16 flex flex-col">
              <div className="flex flex-col">
                <span className="fz-100 fw-700 raleway color-fff">Metis</span>
                <br />
                <span className="fz-72 fw-700 raleway color-fff">Sequencer Mining</span>
              </div>
              <div className="lh-120 maxw-500 fz-20 fw-500 raleway color-fff">
                Secure the Metis network and earn staking rewards. An exclusive opportunity for qualified operators.
              </div>
            </div>
            <div className="flex flex-row items-center gap-12">
              <Button onClick={jumpLink} type="dark" className="radius-50">
                <div className="pt-15 pb-15 pl-30 pr-30 fz-18 fw-500 raleway">Become a Sequencer</div>
              </Button>
              <Button onClick={()=>{}} type="light" className="radius-50">
                <div className="pt-15 pb-15 pl-30 pr-30 fz-18 fw-500 raleway">Read Docs</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-8 info-card-container w-1150">
          <div className="opacity-card flex flex-col items-center flex-1">
            <span className="fz-18 fw-700 inter">
              {sequencerTotalInfo?.currentSequencerSetTotalLockReadable || '-'}{' '}
            </span>

            <div className="flex items-center gap-8">
              <span className="fz-14 fw-400 inter">Total METIS locked</span>
            </div>
          </div>
          <div className="opacity-card flex flex-col items-center flex-1">
            <span className="fz-18 fw-700 inter">{BigNumber(defaultExpectedApr).multipliedBy(100).toString()}%</span>
            <div className="flex items-center gap-8">
              <span className="fz-14 fw-400 inter">Expected APR</span>
            </div>
          </div>
          <div className="opacity-card flex flex-col items-center flex-1">
            <span className="fz-18 fw-700 inter">{data?.lockedUserParams?.length || '-'}</span>
            <div className="flex items-center gap-8">
              <span className="fz-14 fw-400 inter">Current number of Sequencers</span>
            </div>
          </div>
          <div className="opacity-card flex flex-col items-center flex-1">
            <span className="fz-18 fw-700 inter">-%</span>
            <div className="flex items-center gap-8">
              <span className="fz-14 fw-400 inter">Total rewards distributed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-section maxw-1140 m-auto flex flex-col pt-90 pb-153 wp-100">
        <div className="flex flex-row items-center justify-between">
          <div className="fz-36 fw-700 color-000">Sequencers</div>
          {/* <div>
            <Input />
            <div>
              <span>Sort By</span>
            </div>
            <div>
              <span>Health Status</span>
            </div>
          </div> */}
        </div>
        <div className="mb-35 h-1 w-full bg-color-CDCDCD mt-20" />
        <div className="flex flex-row items-center gap-20">
          {sequencerCards?.map((i, index) => (
            <SequencerItemContainer
              title="SEQ"
              totalLockUp={BigNumber(i?.amount || 0)
                .div(1e18)
                .toString()}
              uptime=""
              since={dayjs(i?.fromTimestamp * 1000).format('YYYY-MM-DD')}
              earned=""
              onClick={() => {
                jumpSequencer(i.id);
              }}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="main-section main-section-2 flex flex-col gap-22 h-791 justify-center">
        <div className="flex flex-col gap-12 items-center">
          <span className="fz-56 fw-700 color-fff raleway">{section2.title}</span>
        </div>
        <div className="flex flex-row items-center gap-18 items-center justify-center">
          {section2.children.map((i) => (
            <div className="gap-16 flex flex-col color-fff items-center" key={i.title}>
              <div className="flex flex-col gap-14 ">
                <span className="fz-36 fw-700 raleway color-fff">{i.title}</span>
              </div>
              <div className="flex flex-col gap-38 p-40 radius-30" style={{ background: i.gradient }}>
                {i?.children?.map((j) => (
                  <Section2CardTemplate key={j.title} title={j.title} content={j.content} img={j.img} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequencer */}
      <div className="sc3 main-section main-section-3 flex flex-col gap-56 pt-127 pb-152">
        <div className="flex flex-col gap-12 items-center justify-center">
          <span className="fz-56 fw-700 raleway inter align-center">
            Decentralized Sequencer
            <br />
            Overall Architecture
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="position-relative">
            <div className="fz-42 fw-700 lh-110 color-fff top-64 left-67 position-absolute">
              Decentralized
              <br />
              Sequencer Overall
              <br />
              Architecture
            </div>
            <img className="w-784" src={getImageUrl('@/assets/images/_global/Decentralized_Sequencer.png')} />
          </div>
        </div>
      </div>

      {/* waitinglist campagin */}
      <div className="sc4 main-section main-section-4 flex flex-col items-center gap-64 pt-97 pb-121">
        <div className="flex flex-col gap-12 items-center">
          <span className="fz-56 fw-700 raleway color-fff">Whitelisting Campaign</span>
        </div>

        <Progress col={section4} activeIndex="1" />

        <Button className="light h-60 w-400">
          <div className="fz-20 fw-500 color-000 raleway">Apply now for the next round</div>
        </Button>
      </div>

      {/* FAQ */}
      <div className="sc5 main-section flex flex-row gap-64 pt-91 pb-54 maxw-1200 m-auto items-center">
        <div className="flex flex-col gap-2 flex-1">
          <span className="fz-56 fw-700 raleway color-000">FAQ</span>
          <span className="fz-20 fw-400 raleway color-000">Frequently asked questions</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="203" viewBox="0 0 2 203" fill="none">
            <path d="M1 0L1.00001 203" stroke="black" />
          </svg>
        </div>
        <div className="flex flex-row items-center flex-2">
          <Faq
            data={section5}
            // styles={styles} config={config}
          />
        </div>
      </div>
    </Container>
  );
}

Component.displayName = 'Home';
