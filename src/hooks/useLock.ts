import useAuth from "./useAuth";
import { lockContract } from "@/configs/common";
import { catchError } from "@/utils/tools";
import { calTxData, sendTx, txAwait } from "@/utils/tx";

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
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: lockContract.abi,
        functionName: "lockFor",
        args: [address, amount, pubKey],
      });

      if (!signer) {
        throw new Error("Invalid Signer");
      }

      const hash = await sendTx({
        walletClient: signer,
        to: lockContract.address,
        value: "0x0",
        data: txData,
      });
      const tx = await txAwait(hash);

      return tx;
    } catch (e) {
      throw e;
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
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: lockContract.abi,
        functionName: "relock",
        args: [sequencerId, amount, lockRewards],
      });

      if (!signer) {
        throw new Error("Invalid Signer");
      }

      const hash = await sendTx({
        walletClient: signer,
        to: lockContract.address,
        value: "0x0",
        data: txData,
      });
      const tx = await txAwait(hash);

      return tx;
    } catch (e) {
      throw e;
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
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: lockContract.abi,
        functionName: "withdrawRewards",
        args: [sequencerId, withdrawToL2],
      });

      if (!signer) {
        throw new Error("Invalid Signer");
      }

      const hash = await sendTx({
        walletClient: signer,
        to: lockContract.address,
        value: "0x0",
        data: txData,
      });
      const tx = await txAwait(hash);

      return tx;
    } catch (e) {
      throw e;
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
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: lockContract.abi,
        functionName: "unlock",
        args: [sequencerId, withdrawRewardToL2],
      });

      if (!signer) {
        throw new Error("Invalid Signer");
      }

      const hash = await sendTx({
        walletClient: signer,
        to: lockContract.address,
        value: "0x0",
        data: txData,
      });
      const tx = await txAwait(hash);

      return tx;
    } catch (e) {
      throw e;
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
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: lockContract.abi,
        functionName: "unlockClaim",
        args: [sequencerId, withdrawRewardToL2],
      });

      if (!signer) {
        throw new Error("Invalid Signer");
      }

      const hash = await sendTx({
        walletClient: signer,
        to: lockContract.address,
        value: "0x0",
        data: txData,
      });
      const tx = await txAwait(hash);

      return tx;
    } catch (e) {
      throw e;
      catchError(e);
    }
  };

  return { lockFor, relock, withdrawRewards, unlock, unlockClaim };
};
export default useLock;
