import { lockContract, basicChainId } from "@/configs/common";
import { useRequest } from "ahooks";
import useAuth from "./useAuth";
import { multicall } from "@wagmi/core";
import { useRecoilState } from "recoil";
import { recoilSequencerInfo } from "@/models";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

const useSequencerInfo = () => {
  const { connector } = useAuth(true);
  const [sequencerInfo, setSequencerInfo] = useRecoilState(recoilSequencerInfo);

  const intervalUpdate = async (
    props: any = {
      sequencerId: undefined,
    }
  ) => {
    const {
      sequencerId,
    }: {
      sequencerId?: string;
    } = props;

    if (!sequencerId) return;

    let p: any[] = [
      {
        ...lockContract,
        chainId: basicChainId,
        functionName: "sequencerReward",
        args: [sequencerId],
      },
      {
        ...lockContract,
        chainId: basicChainId,
        functionName: "sequencerLock",
        args: [sequencerId],
      },
      {
        ...lockContract,
        chainId: basicChainId,
        functionName: "sequencers",
        args: [sequencerId],
      },
    ];

    const res = await multicall({
      contracts: p,
    });

    const result: any = {};
    res.forEach((i: any, index) => {
      //   let temp: any = {};
      //   if (Array.isArray(i)) {
      //     Object.keys(i).forEach((j, jndex) => {
      //       temp[j] = i?.[jndex]?._isBigNumber
      //         ? i?.[jndex]?.toString()
      //         : i?.[jndex];
      //     });
      //   }

      //   console.log("temo", temp);
      result[p[index].functionName] = i?._isBigNumber ? i.toString() : i;
    });

    const status = result?.sequencers?.status;
    const unlockClaimTime = result?.sequencers?.unlockClaimTime?.toString();
    // const reward = BigNumber(result?.sequencers?.reward || '0').minus(1)?.toString();
    const reward = result?.sequencerReward.toString();
    const rewardReadable = ethers.utils.formatEther(reward || "0").toString();

    setSequencerInfo({
      ...result,
      status,
      unlockClaimTime,
      reward,
      rewardReadable,
    });
    return result;
  };

  const props = useRequest(intervalUpdate, {
    manual: true,
    pollingInterval: 5000,
  });

  return { sequencerInfo, ...props };
};

export default useSequencerInfo;
