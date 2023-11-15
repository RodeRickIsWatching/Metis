import { MAX_ALLOWANCE, depositToken, lockContract } from '@/configs/common';
import { recoilAllowance } from '@/models';
import { useRecoilState } from 'recoil';
import useAuth from './useAuth';
import { catchError } from '@/utils/tools';
import { calTxData, sendTx, txAwait } from '@/utils/tx';
import useChainWatcher from './useChainWatcher';

const useAllowance = () => {
  const { chain } = useChainWatcher();
  const { connector, address } = useAuth(true);
  const [allowance, setAllowance] = useRecoilState(recoilAllowance);
  const approve = async () => {
    try {
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: depositToken.abi,
        functionName: 'approve',
        args: [lockContract?.address, MAX_ALLOWANCE],
      });

      if (!signer) {
        throw new Error('Invalid Signer');
      }

      const hash = await sendTx({
        walletClient: signer,
        to: depositToken.address,
        value: '0x0',
        data: txData,
        chain: chain
      });
      if (!chain?.id) {
        throw new Error('Invalid Clent');
      }
      const tx = await txAwait(hash, chain?.id);

      return tx;
    } catch (e) {
      catchError(e);
    }
  };
  return { allowance, approve };
};

export default useAllowance;
