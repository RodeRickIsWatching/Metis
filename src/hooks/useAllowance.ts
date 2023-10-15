import { MAX_ALLOWANCE, depositToken, lockContract } from "@/configs/common";
import { recoilAllowance } from "@/models";
import { useRecoilState } from "recoil";
import useAuth from "./useAuth";
import { catchError } from "@/utils/tools";
import { calTxData, sendTx, txAwait } from "@/utils/tx";

const useAllowance = () => {
  const { connector, address } = useAuth(true);
  const [allowance, setAllowance] = useRecoilState(recoilAllowance);
  const approve = async () => {
    try {
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: depositToken.abi,
        functionName: "approve",
        args: [lockContract?.address, MAX_ALLOWANCE],
      });

      if (!signer) {
        throw new Error("Invalid Signer");
      }

      const hash = await sendTx({
        walletClient: signer,
        to: depositToken.address,
        value: "0x0",
        data: txData,
      });
      const tx = await txAwait(hash);

      return tx;
    } catch (e) {
      catchError(e);
    }
  };
  return { allowance, approve };
};

export default useAllowance;
