import { multicall } from '@wagmi/core';
import useAuth from './useAuth';
import { basicChainId, depositToken, lockContract } from '@/configs/common';
import { useRequest } from 'ahooks';
import { useRecoilState } from 'recoil';
import { recoilAllowance, recoilBalance, recoilBlockReward, recoilSequencerId, recoilSequencerTotalInfo } from '@/models';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

const mockId = '3';

const useUpdate = () => {
  const { connector } = useAuth(true);

  const [sequencerId, setSequencerId] = useRecoilState(recoilSequencerId);
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

    let p: any[] = [
      {
        ...lockContract,
        functionName: 'BLOCK_REWARD',
        args: [],
      },
      {
        ...lockContract,
        chainId: basicChainId,
        functionName: 'currentSequencerSetSize',
        args: [],
      },
      {
        ...lockContract,
        chainId: basicChainId,
        functionName: 'currentSequencerSetTotalLock',
        args: [],
      },
    ];

    if (sequencerId) {
      p = [
        ...p,
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'sequencerReward',
          args: [sequencerId],
        },
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'sequencerLock',
          args: [sequencerId],
        },
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'sequencers',
          args: [sequencerId],
        },
      ];
    }

    if (address) {
      p = [
        ...p,
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'getSequencerId',
          args: [address],
        },
        {
          ...depositToken,
          chainId: basicChainId,
          functionName: 'balanceOf',
          args: [address],
        },
        {
          ...depositToken,
          chainId: basicChainId,
          functionName: 'allowance',
          args: [address, lockContract.address],
        },
      ];
    }

    const res = await multicall({
      contracts: p,
    });

    const result: any = {};

    res.forEach((i: any, index) => {
      result[p[index].functionName] = (i?.result || 0)?.toString();
    });

    if (result?.BLOCK_REWARD) {
      const rewardReadable = BigNumber(result?.BLOCK_REWARD).div(1e18).toString();
      setBlockReward(rewardReadable);
    }

    if (result?.getSequencerId) {
      setSequencerId(result?.getSequencerId);
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
      currentSequencerSetTotalLockReadable: ethers.utils.formatEther(result?.currentSequencerSetTotalLock).toString(),
    });

    return result;
  };

  const props = useRequest(intervalUpdate, {
    manual: true,
    pollingInterval: 5000,
  });

  return { ...props, metisBalance: balance, sequencerTotalInfo, sequencerId, blockReward };
};

export default useUpdate;
