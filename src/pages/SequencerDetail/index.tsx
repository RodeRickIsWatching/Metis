/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
import * as React from 'react';
import './index.scss';
import { styled } from 'styled-components';
import { catchError, filterHideText, getImageUrl, jumpLink } from '@/utils/tools';
import { Button, Input, Pagination, Tooltip } from '@/components';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import CopyAddress from '@/components/CopyAddress';
import IncreaseModal from './components/IncreaseModal';
import UnlockModal from './components/UnlockModal';
import DetailModal from './components/DetailModal';
import WithdrawModal from './components/WithdrawModal';
import ClaimModal from './components/ClaimModal';
import useSequencerInfo from '@/hooks/useSequencerInfo';
import { ethers } from 'ethers';
import useUpdate from '@/hooks/useUpdate';
import { useBoolean, useCountDown, useRequest } from 'ahooks';
import fetchUserTx from '@/graphql/tx';
import BigNumber from 'bignumber.js';
import useAuth from '@/hooks/useAuth';
import useAllowance from '@/hooks/useAllowance';
import useLock from '@/hooks/useLock';
import { explorer, isDev } from '@/configs/common';
import fetchBlock from '@/graphql/blocks';
import useBalance from '@/hooks/useBalance';
import { getUser } from '@/services';

const testMode = true;

const Container = styled.section`
  .half-w {
    width: 50%;
  }

  .p-0-72 {
    padding: 0px 72px;
  }

  .f-24-bold {
    font-size: 24px;
    font-family: Poppins-ExtraBold, Poppins;
    font-weight: 800;
    color: #313146;
    line-height: 35px;
  }

  .mb-24 {
    margin-bottom: 24px;
  }

  .f-20-bold {
    font-size: 20px;
    font-family: Poppins-ExtraBold, Poppins;
    font-weight: 800;
    color: #313146;
    line-height: 30px;
  }

  .f-14 {
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #313146;
    line-height: 21px;
  }

  .f-14-bold {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #00d2c1;
    line-height: 20px;
  }

  .f-16-bold {
    font-size: 16px;
    font-family: Poppins-ExtraBold, Poppins;
    font-weight: 800;
    color: #313146;
    line-height: 25px;
  }

  .f-18-bold {
    font-size: 18px;
    font-family: Poppins-Bold, Poppins;
    font-weight: bold;
    color: #313146;
    line-height: 27px;
  }

  position: relative;

  .basic-card {
    padding: 22px;
    border-radius: 20px;
    background: #fff;
  }

  background: #f5f5f5;
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;

    background: url(${getImageUrl('@/assets/images/_global/home_top_banner.png')}), lightgray 50% / cover no-repeat;
    /* filter: blur(75px); */

    background-size: cover;
    aspect-ratio: 1920 / 410;
    z-index: 0;
  }

  .content {
    max-width: 1440px;
    margin: auto;
  }

  .avatar {
    background: url(${getImageUrl('@/assets/images/sequencer/avatar.svg')}) no-repeat;
    background-size: contain;
    border-radius: 50%;
  }

  .status-label {
    width: 120px;
    height: 40px;
    /* background: #E5FBF9; */
    border-radius: 12px;
  }

  .status-overview {
    display: inline-flex;
    overflow: hidden;
    .overview-item {
      border-radius: 20px;
      border: 1px solid rgba(0, 45, 133, 0.2);
      background: rgba(0, 45, 133, 0.2);
    }
  }

  .sc0 {
    background: #f6f9fd;
    padding: 48px 0;

    .b {
      width: 990px;
      margin: auto;
    }

    .unclaimed-rewards-container {
      background: #ffffff;
      border-radius: 16px;
      padding: 28px 14px 28px;
    }
  }

  .sc1 {
    max-width: 990px;

    margin-left: auto;
    margin-right: auto;
    height: 160px;

    .unlock-in-progress {
      padding: 10px 20px;
      width: 282px;
      height: 60px;
      background: rgba(247, 232, 231, 1);
      border-radius: 12px;
      img {
        width: 16px;
        height: 21px;
      }

      .f-14-bold {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #b71b13;
        line-height: 20px;
      }

      .f-12 {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #b71b13;
        line-height: 17px;
      }
    }
    .basic-card {
      /* height: 100%; */
      > div {
        padding-top: 28px;
      }
      & > div:not(:last-of-type) {
        border-right: 1px solid #efefef;
      }
    }

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
  }

  .sc2 {
    margin-left: auto;
    margin-right: auto;
    .block-container {
      width: 990px;
      min-height: 392px;
      display: block;
    }

    table {
      border-collapse: separate;
      tr {
        height: 56px;
      }
      th,
      td {
        text-align: left;
        vertical-align: middle;
        font-size: 14px;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #313146;
        line-height: 21px;
      }
    }
  }

  .sc3 {
    margin-left: auto;
    margin-right: auto;
    .block-container {
      width: 990px;
      min-height: 392px;
      display: block;
    }

    table {
      border-collapse: separate;
      tr {
        height: 56px;
      }
      th,
      td {
        text-align: left;
        vertical-align: middle;
        font-size: 14px;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #313146;
        line-height: 21px;
      }
    }
  }
`;

const txPageSize = 10;
const blocksPageSize = 10;
export function Component() {
  const { id } = useParams();
  const { address, chainId } = useAuth(true);
  const [relockAmount, setRelockAmount] = React.useState<string | undefined>();

  const { allSequencerInfo, run, cancel, data: sequencerInfoList, getSequencerId } = useSequencerInfo();


  const currentSequencerInfo = React.useMemo(() => {
    if (!allSequencerInfo || !id) return null;
    return allSequencerInfo?.[id?.toLowerCase()];
  }, [allSequencerInfo, id]);


  const sequencerInfo = sequencerInfoList?.[0];

  const { sequencerId, blockReward, metisBalance } = useUpdate();

  const {
    run: fetchUserTxRun,
    loading: fetchUserTxLoading,
    data: fetchUserTxData,
  }: any = useRequest(fetchUserTx, { manual: true });

  const {
    run: fetchBlockTxRun,
    loading: fetchBlockTxLoading,
    data: fetchBlockTxData,
  }: any = useRequest(fetchBlock, { manual: true });

  const curUserActiveSequencerId = React.useMemo(
    () =>
      (fetchUserTxData?.origin?.lockedParams?.length
        ? Array.from(
          new Set(fetchUserTxData?.origin?.lockedParams?.map((i: { sequencerId: any }) => i.sequencerId)),
        )?.[0]
        : undefined),
    [fetchUserTxData?.origin?.lockedParams],
  );

  const ifSelf = React.useMemo(() => id?.toLowerCase() === address?.toLowerCase(), [address, id]);

  const handleInitCheck = async () => {
    let activeSequencerId = curUserActiveSequencerId;
    if (!activeSequencerId) {
      activeSequencerId = await getSequencerId(id);
    }

    if (!activeSequencerId) return;
    cancel();
    run({ sequencerId: activeSequencerId, self: ifSelf });
    return () => {
      cancel();
    };
  };

  React.useEffect(() => {
    handleInitCheck();
  }, [curUserActiveSequencerId, ifSelf, id]);

  React.useEffect(() => {
    if (id) {
      fetchUserTxRun(id, chainId);
      fetchBlockTxRun(id);
    }
  }, [id, chainId]);

  const txCol = React.useMemo(() => {
    return fetchUserTxData?.combinedData?.sort((a, b) => +b?.blockTimestamp - +a?.blockTimestamp);
  }, [fetchUserTxData?.combinedData]);

  const [txCurrentPage, setTxCurrentPage] = React.useState(1);
  const txTotal = React.useMemo(() => txCol?.length || 0, [txCol?.length]);

  // a.slice(0,10)
  // a.slice(10,20)
  const filteredTxCol = React.useMemo(() => {
    const curPage = txCurrentPage - 1;
    const fromIndex = txPageSize * curPage;
    const toIndex = txPageSize * curPage + txPageSize;
    return txCol?.slice(fromIndex, toIndex);
  }, [txCurrentPage, txCol]);

  const totalRewards = React.useMemo(() => {
    const claimedAmount = fetchUserTxData?.origin?.claimRewardsParams?.reduce((prev: any, next: any) => {
      return BigNumber(prev).plus(next?.amount).toString();
    }, '0');

    const claimedAmountReadable = BigNumber(claimedAmount || 0)
      .div(1e18)
      .toString();

    return BigNumber(sequencerInfo?.rewardReadable || 0)
      .plus(claimedAmountReadable || 0)
      .toString();
  }, [fetchUserTxData?.origin?.claimRewardsParams, sequencerInfo?.rewardReadable]);

  const blocksCol = React.useMemo(() => {
    return fetchBlockTxData?.userEpochParams?.map((i: any) => {
      const blockNumbers = BigNumber(i?.endBlock).minus(i?.startBlock).plus(1).toString();
      const rewards = BigNumber(blockNumbers).multipliedBy(blockReward).toFixed(4, BigNumber.ROUND_DOWN);
      return { ...i, rewards: rewards };
    });
  }, [blockReward, fetchBlockTxData?.userEpochParams]);

  const [blocksCurrentPage, setBlocksCurrentPage] = React.useState(1);
  const blocksTotal = React.useMemo(() => blocksCol?.length || 0, [blocksCol?.length]);

  const filteredBlocksCol = React.useMemo(() => {
    const curPage = blocksCurrentPage - 1;
    const fromIndex = blocksPageSize * curPage;
    const toIndex = blocksPageSize * curPage + blocksPageSize;
    return blocksCol?.slice(fromIndex, toIndex);
  }, [blocksCurrentPage, blocksCol]);

  const lockedup = React.useMemo(
    () => ethers.utils.formatEther(sequencerInfo?.sequencerLock || '0').toString(),
    [sequencerInfo?.sequencerLock],
  );

  const { relock } = useLock();

  const { allowance, approve } = useAllowance();
  const [approveLoading, { setTrue: setApproveLoadingTrue, setFalse: setApproveLoadingFalse }] = useBoolean(false);

  const needApprove = React.useMemo(
    () => BigNumber(allowance || '0').lte(ethers.utils.parseEther(relockAmount || '0').toString()),
    [allowance, relockAmount],
  );

  const handleApprove = async () => {
    const res = await approve();
  };

  const handleRelock = async () => {
    try {
      if (!allowance || needApprove) {
        setApproveLoadingTrue();
        await handleApprove();
        setApproveLoadingFalse();
        return;
      }

      setApproveLoadingTrue();

      console.log('---relock---', {
        // address: address as Address,
        amount: ethers.utils.parseEther(relockAmount || '0').toString(),
        // pubKey: pubKey as string,
        lockRewards: sequencerInfo?.reward,
        sequencerId,
      });
      await relock({
        // address: address as Address,
        amount: ethers.utils.parseEther(relockAmount || '0').toString(),
        // pubKey: pubKey as string,
        lockRewards: false,
        sequencerId,
      });
      setApproveLoadingFalse();
    } catch (e) {
      console.log(e);
      setApproveLoadingFalse();
      // catchError(e);
    }
  };

  const [increaseVisible, setIncreaseVisible] = React.useState(false);
  const [detailsVisible, setDetailsVisible] = React.useState(false);
  const [unlockVisible, setUnlockVisible] = React.useState(false);
  const [claimVisible, setClaimVisible] = React.useState(false);
  const [withdrawVisible, setWithdrawVisible] = React.useState(false);

  // 是否unlock后等待中
  const ifInUnlockProgress = sequencerInfo?.ifInUnlockProgress;

  // const unlockTo = React.useMemo(
  //   () => dayjs.unix(sequencerInfo?.unlockClaimTime || 0).format('YYYY-MM-DD HH:mm:ss'),
  //   [sequencerInfo?.unlockClaimTime],
  // );

  // const [countdown, formattedRes] = useCountDown({
  //   targetDate: unlockTo,
  // });

  const unclaimed = React.useMemo(() => sequencerInfo?.rewardReadable || '0', [sequencerInfo?.rewardReadable]);

  const joinedDuration = React.useMemo(() => {
    // 默认 desc，todo 保证不出错进行排序
    const fromDate = fetchUserTxData?.origin?.lockedParams?.[0]?.blockTimestamp;
    const lastDate = fetchUserTxData?.origin?.unlockInitParams?.length
      ? fetchUserTxData?.origin?.unlockInitParams?.[0]?.blockTimestamp
      : +dayjs().unix();

    return BigNumber(lastDate).minus(fromDate).toString();
  }, [fetchUserTxData?.origin?.lockedParams, fetchUserTxData?.origin?.unlockInitParams]);

  // Current APR = (Total Reward/加入天数/Lock-up)*365*100%
  const currentApr = React.useMemo(() => {
    const days = BigNumber(joinedDuration).div(3600).div(24).toFixed(0, BigNumber.ROUND_DOWN);

    if (
      BigNumber(days).isZero() ||
      BigNumber(days).isNaN() ||
      BigNumber(totalRewards).isZero() ||
      BigNumber(totalRewards).isNaN() ||
      BigNumber(lockedup).isZero() ||
      BigNumber(lockedup).isNaN()
    ) {
      return '0';
    }
    return BigNumber(totalRewards).div(days).div(lockedup).multipliedBy(365).multipliedBy(100).toFixed(2, BigNumber.ROUND_CEIL);
  }, [joinedDuration, lockedup, totalRewards]);

  return (
    <Container className="pages-landing flex flex-col ">
      <div className="banner h-410" />
      <div className="position-relative z-1 content flex flex-col items-center ">
        <div className="pt-55 pb-20 gap-70 flex flex-col w-full">
          <div className="flex flex-row gap-32 items-center">
            {
              currentSequencerInfo?.avatar ? (
                <div className="flex flex-row items-center justify-center mb-24" >
                  <img className="s-150 radiusp-50" src={currentSequencerInfo?.avatar} />
                </div>
              ) : (<div className="avatar mb-24 s-150" />)
            }

            <div className="flex flex-col gap-12 color-fff">
              <div className="flex flex-col gap-4">
                <div className="fz-36 fw-500 ">{currentSequencerInfo?.name || '-'}</div>
                <div className="fz-16 fw-400 inter maxw-470" >{currentSequencerInfo?.desc || '-'}</div>
              </div>
              <div>
                <span
                  className="fz-18 fw-400 pointer underlined"
                  onClick={() => {
                  if (!currentSequencerInfo?.url) return;
                  jumpLink(currentSequencerInfo?.url, '_blank');
                }}
                >{currentSequencerInfo?.url}</span>
              </div>
            </div>
          </div>

          <div className="status-overview flex flex-row justify-center gap-10 color-fff">
            <div className="overview-item flex-1 pt-12 pb-12 pl-30 pr-30 flex flex-col justify-center gap-10">
              <div className="fz-26 fw-500 color-fff">Owner</div>
              <CopyAddress addr={id} className={'flex-1 fz-16 fw-400 inter color-fff'} />
            </div>
            <div className="overview-item flex-1 pt-12 pb-12 pl-30 pr-30 flex flex-col justify-center gap-10">
              <div className="fz-26 fw-500 color-fff">Signer</div>
              <CopyAddress addr={id} className={'flex-1 fz-16 fw-400 inter color-fff'} />
            </div>
            <div className="overview-item flex-1 pt-12 pb-12 pl-30 pr-30 flex flex-col justify-center gap-10">
              <div className="fz-26 fw-500 color-fff">Blocks Signed</div>
              <div className="flex flex-col gap-4">
                <div className="fz-12 fw-700 color-fff inter align-right">100%</div>
                <div
                  className="progress w-full h-2 radius-50"
                  style={{
                    background: 'linear-gradient(90deg, #00D2FF 0%, #FFF 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-60 pb-146 flex flex-col gap-20 w-1060">
          <div className="w-full basic-card gap-21 flex flex-col pb-38">
            <div className="flex flex-row items-center justify-between">
              <div className="fz-28 fw-500 ">Mining Overview</div>
              {isDev ? (
                <div className="flex flex-row items-center gap-8">
                  <Button
                    type="solid"
                    onClick={() => {
                      setIncreaseVisible(true);
                    }}
                  >
                    <div style={{ padding: '10px 16px' }}>Increase</div>
                  </Button>
                  <Button
                    type="solid"
                    onClick={() => {
                      setUnlockVisible(true);
                    }}
                  >
                    <div style={{ padding: '10px 16px' }}>Unlock</div>
                  </Button>
                  <Button
                    type="solid"
                    onClick={() => {
                      setClaimVisible(true);
                    }}
                  >
                    <div style={{ padding: '10px 16px' }}>Claim</div>
                  </Button>
                  <Button
                    type="solid"
                    onClick={() => {
                      setWithdrawVisible(true);
                    }}
                  >
                    <div style={{ padding: '10px 16px' }}>Withdraw</div>
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="h-1 bg-color-DFDFDF" />

            <div className="flex flex-row items-center gap-20">
              {/* Locked UP */}
              <div className="flex-1 flex flex-col gap-12">
                <div className="flex flex-row items-center gap-6">
                  <div className="color-848484 fz-20 fw-500">Locked-UP</div>
                  <Tooltip title={<span>The amount of METIS tokens sequencer locked up in the pool.</span>}>
                    <img src={getImageUrl('@/assets/images/_global/ic_q.svg')} />
                  </Tooltip>
                </div>
                <div className="fz-26 color-000 fw-500 flex flex-row items-center gap-8">
                  <span>{lockedup}</span>
                  <img src={getImageUrl('@/assets/images/token/metis.svg')} />
                  {ifSelf ? (
                    ifInUnlockProgress ? (
                      <Button
                        className="pl-15 pr-15"
                        type="metis"
                        // disabled={countdown > 0}
                        onClick={() => {
                          if (ifInUnlockProgress) {
                            setWithdrawVisible(true);
                          }
                        }}
                      >
                        <span>Withdraw</span>
                      </Button>
                    ) : (
                      <Button
                        className="pl-15 pr-15"
                        type="metis"
                        onClick={() => {
                          if (BigNumber(lockedup).gt(0)) {
                            setUnlockVisible(true);
                          } else {
                            setIncreaseVisible(true);
                          }
                        }}
                      >
                        {BigNumber(lockedup).gt(0) ? 'Unlock' : 'Lock'}
                      </Button>
                    )
                  ) : null}
                </div>
              </div>

              {/* Current APR */}
              <div className="flex-1 flex flex-col gap-12">
                <div className="flex flex-row items-center gap-6">
                  <div className="color-848484 fz-20 fw-500">Current APR</div>
                  <Tooltip title={<span>The annual rate of return from sequencer mining.</span>}>
                    <img src={getImageUrl('@/assets/images/_global/ic_q.svg')} />
                  </Tooltip>
                </div>
                <div className="fz-26 color-000 fw-500">{currentApr}%</div>
              </div>

              {/* TOTAL REWARDS  */}
              <div className="flex-1 flex flex-col gap-12">
                <div className="flex flex-row items-center gap-6">
                  <div className="color-848484 fz-20 fw-500">TOTAL REWARDS</div>
                  <Tooltip title={<span>The total amount of METIS tokens the sequencer has earned from mining.</span>}>
                    <img src={getImageUrl('@/assets/images/_global/ic_q.svg')} />
                  </Tooltip>
                </div>
                <div className="fz-26 color-000 fw-500 flex flex-row items-center gap-8">
                  {/* {lockedup} METIS +  */}
                  <span>{totalRewards || '0'}</span> <img src={getImageUrl('@/assets/images/token/metis.svg')} />
                </div>
              </div>
            </div>
          </div>

          {/* unclaimed sequencerInfo?.rewardReadable */}
          {ifSelf ? (
            <div className="flex flex-row items-center gap-20">
              <div className="flex-1 wp-50 basic-card gap-21 flex flex-col pb-38">
                <div className="flex flex-row items-center justify-between">
                  <div className="fz-28 fw-500 ">Claim Your Rewards</div>
                </div>

                <div className="h-1 bg-color-DFDFDF" />

                <div className="flex flex-row items-center gap-20">
                  {/* Claim Your Rewards */}
                  <div className="flex-1 flex flex-col gap-12">
                    <div className="flex flex-row items-center gap-6">
                      <div className="color-848484 fz-20 fw-500">Unclaimed Rewards</div>
                      <Tooltip title={<span>Tooltip</span>}>
                        <img src={getImageUrl('@/assets/images/_global/ic_q.svg')} />
                      </Tooltip>
                    </div>
                    <div className="fz-26 color-000 fw-500 flex flex-row items-center gap-8">
                      <span>{unclaimed}</span>
                      <img src={getImageUrl('@/assets/images/token/metis.svg')} />
                      <Button
                        onClick={() => {
                          setClaimVisible(true);
                        }}
                        disabled={BigNumber(unclaimed).lte(0)}
                        className="pl-15 pr-15"
                        type="metis"
                      >
                        Claim
                      </Button>
                    </div>
                    {/* <span className="color-848484 fz-14 fw-400 inter">
                      1,400 USD
                    </span> */}
                  </div>
                </div>
              </div>

              <div className="flex-1 wp-50 basic-card gap-21 flex flex-col pb-38">
                <div className="flex flex-row items-center justify-between">
                  <div className="fz-28 fw-500 ">Add</div>
                </div>

                <div className="h-1 bg-color-DFDFDF" />

                <div className="flex flex-row items-center gap-20">
                  {/* amount */}
                  <div className="flex-2 flex flex-col gap-12">
                    <div className="flex flex-row items-center gap-6">
                      <div className="color-848484 fz-20 fw-500">Amount</div>
                    </div>
                    <div className="fz-26 color-000 fw-500 flex flex-row items-center gap-8">
                      <Input
                        max={metisBalance?.readable || 0}
                        value={relockAmount}
                        onChange={setRelockAmount}
                        className="fz-26"
                        solid
                        suffix={<img className="s-22" src={getImageUrl('@/assets/images/token/metis.svg')} />}
                      />
                    </div>
                  </div>
                  {/* apr */}
                  <div className="flex-2 flex flex-col gap-12">
                    <div className="flex flex-row items-center gap-6">
                      <div className="color-848484 fz-20 fw-500">Expected APR</div>
                    </div>
                    <div className="fz-26 color-000 fw-500 flex flex-row items-center gap-8">
                      <span>-</span>
                      <img src={getImageUrl('@/assets/images/token/metis.svg')} />
                    </div>
                  </div>
                  {/* confirm */}
                  <div className="flex-1 flex flex-col gap-12">
                    <div className="flex flex-row items-center gap-6">
                      <div className="color-848484 fz-20 fw-500" />
                    </div>
                    <div className="fz-26 color-000 fw-500 flex flex-row items-center gap-8">
                      <Button type="metis" className="h-26" disabled={!relockAmount} loading={approveLoading} onClick={handleRelock}>
                        {needApprove ? <span>Approve</span> : <span>Confirm</span>}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Blocks Signed */}
          <div className="sc2 w-full basic-card gap-20">
            <div className="flex flex-col gap-20">
              <div className="fz-28 fw-500 ">Block Produced</div>
              <div className="h-1 bg-color-DFDFDF" />
            </div>

            <div className="block-container flex flex-row ptb-28 w-full position-relative">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Latest Block Produced</th>
                    <th>Status</th>
                    <th>Rewards</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlocksCol?.map((i, index) => (
                    <tr key={index}>
                      <td>
                        {i?.startBlock} - {i?.endBlock}
                      </td>
                      <td>
                        <div style={{ width: 'fit-content' }} className="pl-10 pr-10 radius-5 bg-color-00DACC33">
                          <span className={true ? 'success-color' : 'danger-color'}>{true ? 'Success' : 'Failed'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="fw-700 inter">{i.rewards} METIS</span>
                      </td>
                      <td>{dayjs.unix(i.blockTimestamp).format('DD/MM/YYYY')}</td>
                      <td>{dayjs.unix(i.blockTimestamp).format('HH:mm:ss')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBlocksCol?.length ? null : (
                <div className="position-absolute translateCenter topr-50 leftr-50 color-848484">No Data</div>
              )}
            </div>
            <div className="pagination flex flex-row items-center justify-end mt-24" style={{ height: '32px' }}>
              <Pagination
                current={blocksCurrentPage}
                total={blocksTotal}
                pageSize={blocksPageSize}
                onChange={(v) => setBlocksCurrentPage(v)}
              />
            </div>
          </div>

          {/* Transaction history */}
          {ifSelf ? (
            <div className="sc3 w-full basic-card gap-20">
              <div className="flex flex-col gap-20">
                <div className="fz-28 fw-500 ">Transaction History</div>
                <div className="h-1 bg-color-DFDFDF" />
              </div>
              <div className="block-container flex flex-row ptb-28 w-full position-relative">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>Address</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTxCol?.map((i: any, index: React.Key | null | undefined) => (
                      <tr key={index}>
                        <td
                          className="align-center underlined pointer"
                          onClick={() => {
                            if (!chainId) return;
                            jumpLink(`${explorer[chainId]}/tx/${i?.id}`, '_blank');
                          }}
                        >
                          {filterHideText(i?.id, 8)}
                        </td>
                        <td>{filterHideText(i?.user, 6, 4)}</td>
                        <td>{i?.type}</td>
                        <td>
                          {i?.deltaAmountReadable || i?.amountReadable} {i?.symbol}
                        </td>
                        <td>{dayjs.unix(i?.blockTimestamp).format('DD/MM/YYYY HH:mm:ss')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredTxCol?.length ? null : (
                  <div className="position-absolute translateCenter topr-50 leftr-50 color-848484">No Data</div>
                )}
              </div>
              <div className="pagination flex flex-row items-center justify-end mt-24" style={{ height: '32px' }}>
                <Pagination
                  current={txCurrentPage}
                  total={txTotal}
                  pageSize={txPageSize}
                  onChange={(v) => setTxCurrentPage(v)}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* modals */}
      <>
        <IncreaseModal
          visible={ifSelf && increaseVisible}
          onClose={() => {
            setIncreaseVisible(false);
          }}
        />

        <UnlockModal
          visible={ifSelf && unlockVisible}
          onClose={() => {
            setUnlockVisible(false);
          }}
        />

        <DetailModal
          visible={ifSelf && detailsVisible}
          onClose={() => {
            setDetailsVisible(false);
          }}
        />

        <WithdrawModal
          visible={ifSelf && withdrawVisible}
          onClose={() => {
            setWithdrawVisible(false);
          }}
        />

        <ClaimModal
          visible={ifSelf && claimVisible}
          onClose={() => {
            setClaimVisible(false);
          }}
        />
      </>
    </Container>
  );
}

Component.displayName = 'SequencerDetail';
