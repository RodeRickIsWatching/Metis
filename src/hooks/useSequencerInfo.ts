/* eslint-disable max-len */
import { lockContract, basicChainId } from '@/configs/common';
import { useRequest } from 'ahooks';
import { multicall, readContract } from '@wagmi/core';
import { useRecoilState } from 'recoil';
import { recoilSequencerInfo } from '@/models';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

const useSequencerInfo = () => {
  const [sequencerInfo, setSequencerInfo] = useRecoilState(recoilSequencerInfo);

  const getSequencerId = async (address?: string) => {
    if (!address) return;
    try {
      const data = await readContract({
        address: lockContract.address,
        abi: lockContract.abi,
        functionName: 'getSequencerId',
        args: [address],
      });

      return data?.toString();
    } catch (e) {
      return undefined;
    }
  };

  const handleSequencerCal = (sequencerInfo: any, multicallFuntions: any) => {
    const result: any = {};
    sequencerInfo.forEach((i: any, index: string | number) => {
      if (Array.isArray(i?.result)) {
        let flattedData: any = {};

        const abiOutput = multicallFuntions[index].abi?.find((k) => multicallFuntions[index].functionName === k.name)?.outputs;
        abiOutput.forEach((j: { name: string | number }, jndex: string | number) => {
          flattedData[j?.name] = i?.result?.[jndex]?.toString();
        });

        result[multicallFuntions[index].functionName] = flattedData;
      } else {
        const j = i?.result || 0;
        result[multicallFuntions[index].functionName] = j?.toString();
      }
    });

    const status = result?.sequencers?.status;
    const unlockClaimTime = result?.sequencers?.unlockClaimTime?.toString();
    // const reward = BigNumber(result?.sequencers?.reward || '0').minus(1)?.toString();
    const reward = result?.sequencerReward.toString();
    const rewardReadable = ethers.utils.formatEther(reward || '0').toString();


    const ifActive = BigNumber(status).eq(1) && BigNumber(result?.sequencers?.deactivationBatch?.toString()).isZero();
    const ifInUnlockProgress = !BigNumber(unlockClaimTime).isZero();

    const finalRes = {
      ...result,
      status,
      unlockClaimTime,
      reward,
      rewardReadable,
      ifActive,
      ifInUnlockProgress,
    };

    return finalRes;
  };

  const intervalUpdate = async (
    props: any = {
      sequencerIds: undefined,
      sequencerId: undefined,
      self: false,
    },
  ) => {
    const {
      sequencerId,
      sequencerIds,
      self,
    }: {
      sequencerId?: string;
      sequencerIds?: string[];
      self?: boolean;
    } = props;

    if (!sequencerId && !sequencerIds?.length) return;
    const s = sequencerIds || [sequencerId];
    const multiP: any[] = s.reduce((prev: any, next: any) => {
      const n = [
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'sequencerReward',
          args: [next],
        },
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'sequencerLock',
          args: [next],
        },
        {
          ...lockContract,
          chainId: basicChainId,
          functionName: 'sequencers',
          args: [next],
        },
      ];
      return [...prev, ...n];
    }, []);

    const res = await multicall({
      contracts: multiP,
    });


    const listedData = s.map((i, index) => {
      return res?.slice(index * 3, index * 3 + 3);
    });

    const finalRes = listedData.map((i) => {
      return handleSequencerCal(i, multiP);
    });

    if (self) {
      setSequencerInfo(finalRes?.[0]);
    }

    return finalRes;
  };


  const props = useRequest(intervalUpdate, {
    manual: true,
    pollingInterval: 5000,
  });

  return { getSequencerId, runOnce: intervalUpdate, sequencerInfo, ...props };
};

export default useSequencerInfo;
