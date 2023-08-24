import { ethers } from "ethers";
import useAuth from "./useAuth";
import { Address } from "wagmi";
import { lockContract } from "@/configs/common";
import { catchError } from "@/utils/tools";

const useLock = () => {
  const { connector, address } = useAuth(true);

  const lockFor = async ({
    address,
    amount,
    pubKey,
  }: {
    address: string;
    amount: string;
    pubKey: string;
  }) => {
    try {
      const signer = await connector?.getSigner();
      // erc20
      const contract = new ethers.Contract(
        lockContract?.address as Address,
        lockContract?.abi,
        signer
      );

      console.log("---lockFor---", address, amount, pubKey);

      const tx = await contract?.lockFor(address, amount, pubKey);
      const result = await tx?.wait();
      return result;
    } catch (e) {
      throw e
      console.log(e);
      catchError(e);
    }
  };

  const relock = async ({
    sequencerId,
    amount,
    lockRewards,
  }: {
    sequencerId: string;
    amount: string;
    lockRewards: boolean;
  }) => {
    try {
      const signer = await connector?.getSigner();
      // erc20
      const contract = new ethers.Contract(
        lockContract?.address as Address,
        lockContract?.abi,
        signer
      );

      const tx = await contract?.relock(sequencerId, amount, lockRewards);
      const result = await tx?.wait();
      return result
    } catch (e) {
      throw e
      catchError(e);
    }
  };

  const withdrawRewards = async ({
    sequencerId,
    withdrawToL2,
  }: {
    sequencerId: string;
    withdrawToL2: boolean;
  }) => {
    try {
      const signer = await connector?.getSigner();
      // erc20
      const contract = new ethers.Contract(
        lockContract?.address as Address,
        lockContract?.abi,
        signer
      );

      const tx = await contract?.withdrawRewards(sequencerId, withdrawToL2);
      const result = await tx?.wait();
      return result
    } catch (e) {
      throw e
      catchError(e);
    }
  };

  const unlock = async ({
    sequencerId,
    withdrawRewardToL2,
  }: {
    sequencerId: string;
    withdrawRewardToL2: boolean;
  }) => {
    try {
      const signer = await connector?.getSigner();
      // erc20
      const contract = new ethers.Contract(
        lockContract?.address as Address,
        lockContract?.abi,
        signer
      );

      console.log('sequencerId: ', sequencerId, "withdrawRewardToL2: ", withdrawRewardToL2)

      const tx = await contract?.unlock(sequencerId, withdrawRewardToL2);
      const result = await tx?.wait();
      return result
    } catch (e) {
      throw e
      catchError(e);
    }
  };

  const unlockClaim = async ({
    sequencerId,
    withdrawRewardToL2,
  }: {
    sequencerId: string;
    withdrawRewardToL2: boolean;
  }) => {
    try {
      const signer = await connector?.getSigner();
      // erc20
      const contract = new ethers.Contract(
        lockContract?.address as Address,
        lockContract?.abi,
        signer
      );

      const tx = await contract?.unlockClaim(sequencerId, withdrawRewardToL2);
      const result = await tx?.wait();
      return result;
    } catch (e) {
      throw e
      catchError(e);
    }
  };

  return { lockFor, relock, withdrawRewards, unlock, unlockClaim };
};
export default useLock;
