import { message } from '@/components';
import useAuth from './useAuth';
import { contracts } from '@/configs/common';
import { catchError } from '@/utils/tools';
import { calTxData, sendTx, txAwait } from '@/utils/tx';
import useChainWatcher from './useChainWatcher';

const useLock = () => {
  const { connector, address } = useAuth(true);
  const { chain, unsupported } = useChainWatcher();

  const lockFor = async ({ address, amount, pubKey }: { address: string; amount: string; pubKey: string }) => {
    if (unsupported || !chain?.id) throw new Error('Unsupported Chain');
    try {
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: contracts.lock?.[chain?.id?.toString()]?.abi,
        functionName: 'lockFor',
        args: [address, amount, pubKey],
      });

      if (!signer) {
        throw new Error('Invalid Signer');
      }

      const hash = await sendTx({
        walletClient: signer,
        to: contracts.lock?.[chain?.id?.toString()]?.address,
        value: '0x0',
        data: txData,
        chain: chain,
      });
      if (!chain?.id) {
        throw new Error('Invalid Clent');
      }
      const tx = await txAwait(hash, chain?.id);
      message.success('Success');

      return tx;
    } catch (e) {
      message.error(catchError(e) || 'Fail');
      throw e;
      console.log(e);
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
    if (unsupported || !chain?.id) throw new Error('Unsupported Chain');
    try {
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: contracts.lock?.[chain?.id?.toString()]?.abi,
        functionName: 'relock',
        args: [sequencerId, amount, lockRewards],
      });

      if (!signer) {
        throw new Error('Invalid Signer');
      }

      const hash = await sendTx({
        walletClient: signer,
        to: contracts.lock?.[chain?.id?.toString()]?.address,
        value: '0x0',
        data: txData,
        chain: chain,
      });
      if (!chain?.id) {
        throw new Error('Invalid Clent');
      }
      const tx = await txAwait(hash, chain?.id);
      message.success('Success');

      return tx;
    } catch (e) {
      message.error(catchError(e) || 'Fail');
      throw e;
      catchError(e);
    }
  };

  const withdrawRewards = async ({ sequencerId, withdrawToL2 }: { sequencerId: string; withdrawToL2: boolean }) => {
    if (unsupported || !chain?.id) throw new Error('Unsupported Chain');
    try {
      console.log('sequencerId', sequencerId);
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: contracts.lock?.[chain?.id?.toString()]?.abi,
        functionName: 'withdrawRewards',
        args: [sequencerId],
      });

      if (!signer) {
        throw new Error('Invalid Signer');
      }

      const hash = await sendTx({
        walletClient: signer,
        to: contracts.lock?.[chain?.id?.toString()]?.address,
        value: '0x0',
        data: txData,
        chain: chain,
      });
      if (!chain?.id) {
        throw new Error('Invalid Clent');
      }
      const tx = await txAwait(hash, chain?.id);
      message.success('Success');

      return tx;
    } catch (e) {
      console.log('e', e);
      message.error(catchError(e) || 'Fail');
      throw e;
      catchError(e);
    }
  };

  const unlock = async ({ sequencerId, withdrawRewardToL2 }: { sequencerId: string; withdrawRewardToL2: boolean }) => {
    if (unsupported || !chain?.id) throw new Error('Unsupported Chain');
    try {
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: contracts.lock?.[chain?.id?.toString()]?.abi,
        functionName: 'unlock',
        args: [sequencerId],
      });

      if (!signer) {
        throw new Error('Invalid Signer');
      }

      const hash = await sendTx({
        walletClient: signer,
        to: contracts.lock?.[chain?.id?.toString()]?.address,
        value: '0x0',
        data: txData,
        chain: chain,
      });
      if (!chain?.id) {
        throw new Error('Invalid Clent');
      }
      const tx = await txAwait(hash, chain?.id);
      message.success('Success');

      return tx;
    } catch (e) {
      message.error(catchError(e) || 'Fail');
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
    if (unsupported || !chain?.id) throw new Error('Unsupported Chain');
    try {
      const signer = await connector?.getWalletClient();
      const txData = calTxData({
        abi: contracts.lock?.[chain?.id?.toString()]?.abi,
        functionName: 'unlockClaim',
        args: [sequencerId],
      });

      if (!signer) {
        throw new Error('Invalid Signer');
      }

      const hash = await sendTx({
        walletClient: signer,
        to: contracts.lock?.[chain?.id?.toString()]?.address,
        value: '0x0',
        data: txData,
        chain: chain,
      });
      if (!chain?.id) {
        throw new Error('Invalid Clent');
      }
      const tx = await txAwait(hash, chain?.id);
      message.success('Success');

      return tx;
    } catch (e) {
      message.error(catchError(e) || 'Fail');
      throw e;
      catchError(e);
    }
  };

  return { lockFor, relock, withdrawRewards, unlock, unlockClaim };
};
export default useLock;
