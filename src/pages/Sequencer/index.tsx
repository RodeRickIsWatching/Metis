import * as React from 'react';
import './index.scss';
import { styled } from 'styled-components';
import { getImageUrl } from '@/utils/tools';
import { Button, Input, Select, Tooltip } from '@/components';
import { useNavigate } from 'react-router-dom';
import useUpdate from '@/hooks/useUpdate';
import SequencerItemContainer from '@/components/SequencerItemContainer';
import { defaultPubKeyList } from '@/configs/common';
import { useRequest } from 'ahooks';
import fetchOverview from '@/graphql/overview';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';

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
      width: calc(50% - 32px);
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
          height: 80px;
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
        }
      }
    }
  }
`;

export function Component() {
  const navigate = useNavigate();
  const jumpLink = () => {
    navigate('/becomeSequencer');
  };

  const jumpSequencer = (id: string) => {
    navigate(`/sequencers/${id}`);
  };

  const option = React.useMemo(() => {
    return [
      {
        name: 'Newest',
        value: '0',
        label: 'Newest',
      },
      {
        name: 'Health',
        value: '1',
        label: 'Health',
      },
    ];
  }, []);

  const [curOption, setCurOption] = React.useState(option?.[0]?.value);

  const onChange = (ele: any) => {
    setCurOption(ele?.value);
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

  const { sequencerTotalInfo } = useUpdate();
  console.log('sequencerTotalInfo', sequencerTotalInfo);

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
              <Button onClick={jumpLink} type="light" className="radius-50">
                <div className="pt-15 pb-15 pl-30 pr-30 fz-18 fw-500 raleway">Read Docs</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-8 info-card-container w-1150">
          <div className="opacity-card flex flex-col items-center flex-1">
            <span className="fz-18 fw-700 inter">
              {sequencerTotalInfo?.currentSequencerSetTotalLockReadable || '-'}
            </span>

            <div className="flex items-center gap-8">
              <span className="fz-14 fw-400 inter">Total METIS locked</span>
            </div>
          </div>
          <div className="opacity-card flex flex-col items-center flex-1">
            <span className="fz-18 fw-700 inter">-%</span>
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
        <div className="mb-35 h-1 w-full bg-color-CDCDCD" />
        <div className="flex flex-row items-center gap-20 flex-wrap">
          {sequencerCards.map((i, index) => (
            <SequencerItemContainer
              title="SEQ"
              totalLockUp={BigNumber(i?.amount || 0).div(1e18).toString()}
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
    </Container>
  );
}

Component.displayName = 'Sequencer';
