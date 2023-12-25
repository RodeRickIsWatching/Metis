/* eslint-disable max-len */
import { multicall } from '@wagmi/core';
import useAuth from './useAuth';
import { contracts } from '@/configs/common';
import { useRequest } from 'ahooks';
import { useRecoilState } from 'recoil';
import {
  recoilAllowance,
  recoilBalance,
  recoilBlockReward,
  recoilLiquidateReward,
  recoilSequencerId,
  recoilSequencerTotalInfo,
  recoilWhitelisted,
} from '@/models';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

const mockId = '3';

const useUpdate = () => {
  const { chainId } = useAuth(true);

  const [sequencerId, setSequencerId] = useRecoilState(recoilSequencerId);
  const [whiteListed, setWhiteListed] = useRecoilState(recoilWhitelisted);
  const [liquidateReward, setLiquidateReward] = useRecoilState(recoilLiquidateReward);
  const [balance, setBalance] = useRecoilState(recoilBalance);
  const [allowance, setAllowance] = useRecoilState(recoilAllowance);
  const [blockReward, setBlockReward] = useRecoilState(recoilBlockReward);

  const [sequencerTotalInfo, setSequencerTotalInfo] = useRecoilState(recoilSequencerTotalInfo);

  const intervalUpdate = async (
    props: any = {
      address: undefined,
      sequencerId: undefined,
    },
  ) => {
    const {
      address,
      sequencerId,
    }: {
      address?: string;
      sequencerId?: string;
    } = props;

    if(!chainId) return;

    let p: any[] = [
      {
        ...contracts.lock?.[chainId?.toString()],
        functionName: 'totalRewardsLiquidated',
        args: [],
      },
      {
        ...contracts.lock?.[chainId?.toString()],
        functionName: 'BLOCK_REWARD',
        args: [],
      },
      {
        ...contracts.lock?.[chainId?.toString()],
        chainId: chainId,
        functionName: 'currentSequencerSetSize',
        args: [],
      },
      {
        ...contracts.lock?.[chainId?.toString()],
        chainId: chainId,
        functionName: 'currentSequencerSetTotalLock',
        args: [],
      },
    ];

    if (sequencerId && chainId) {
      p = [
        ...p,
        {
          ...contracts.lock?.[chainId?.toString()],
          chainId,
          functionName: 'sequencerReward',
          args: [sequencerId],
        },
        {
          ...contracts.lock?.[chainId?.toString()],
          chainId,
          functionName: 'sequencerLock',
          args: [sequencerId],
        },
        {
          ...contracts.lock?.[chainId?.toString()],
          chainId,
          functionName: 'sequencers',
          args: [sequencerId],
        },
      ];
    }

    // seq_addr
    if (address) {
      p = [
        ...p,
        {
          ...contracts.lock?.[chainId?.toString()],
          chainId,
          functionName: 'getSequencerId',
          args: [address],
        },
        {
          ...contracts.deposit?.[chainId?.toString()],
          chainId,
          functionName: 'balanceOf',
          args: [address],
        },
        {
          ...contracts.deposit?.[chainId?.toString()],
          chainId,
          functionName: 'allowance',
          args: [address, contracts.lock?.[chainId?.toString()].address],
        },
        {
          ...contracts.lock?.[chainId?.toString()],
          functionName: 'whiteListAddresses',
          args: [address],
        },
      ];
    }

    const res = await multicall({
      contracts: p,
    });

    const result: any = {};

    res.forEach((i: any, index) => {
      result[p[index].functionName] = (i?.result)?.toString();
    });

    if (result?.totalRewardsLiquidated) {
      const rewardReadable = BigNumber(result?.totalRewardsLiquidated).div(1e18).toString();
      setLiquidateReward(rewardReadable);
    }

    if (result?.BLOCK_REWARD) {
      const rewardReadable = BigNumber(result?.BLOCK_REWARD).div(1e18).toString();
      setBlockReward(rewardReadable);
    }

    if (result?.getSequencerId) {
      setSequencerId(result?.getSequencerId);
    } else {
      setSequencerId('')
    }

    if (result?.whiteListAddresses) {
      setWhiteListed(result?.whiteListAddresses === 'true');
    }

    if (result?.balanceOf) {
      setBalance({
        balance: result?.balanceOf,
        readable: ethers.utils.formatEther(result?.balanceOf).toString(),
      });
    }

    if (result?.allowance) {
      setAllowance(result?.allowance);
    }

    setSequencerTotalInfo({
      currentSequencerSetSize: result?.currentSequencerSetSize,
      currentSequencerSetTotalLock: result?.currentSequencerSetTotalLock,
      currentSequencerSetTotalLockReadable: result?.currentSequencerSetTotalLock ? ethers.utils.formatEther(result?.currentSequencerSetTotalLock).toString() : undefined,
    });

    return result;
  };

  const props = useRequest(intervalUpdate, {
    manual: true,
    pollingInterval: 5000,
    refreshDeps: [chainId]
  });

  return { ...props, liquidateReward, metisBalance: balance, sequencerTotalInfo, whiteListed, sequencerId, blockReward };
};

export default useUpdate;
