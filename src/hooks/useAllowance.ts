import { MAX_ALLOWANCE, depositToken, lockContract } from "@/configs/common";
import { recoilAllowance } from "@/models";
import { useRecoilState } from "recoil";
import useAuth from "./useAuth";
import { Address } from "wagmi";
import { ethers } from "ethers";
import { catchError } from "@/utils/tools";

const useAllowance = () => {
  const { connector, address } = useAuth(true);
  const [allowance, setAllowance] = useRecoilState(recoilAllowance);
  const approve = async () => {
    try {
      const signer = await connector?.getSigner();
      // erc20
      const contract = new ethers.Contract(
        depositToken?.address as Address,
        depositToken?.abi,
        signer
      );

      const tx = await contract?.approve(lockContract?.address, MAX_ALLOWANCE);
      const result = await tx?.wait();

      return result
    } catch (e) {
      catchError(e);
    }
  };
  return { allowance, approve };
};

export default useAllowance;
