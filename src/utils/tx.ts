import { chainId, txPublicClient } from '@/configs/wallet';
import { encodeFunctionData, Abi, decodeFunctionResult, decodeEventLog, WalletClient } from 'viem';

export interface SendTxInterface {
    walletClient?: WalletClient;
    to: string | `0x${string}`;
    account?: string | `0x${string}`;
    value?: string | `0x${string}`;
    data?: string | `0x${string}`;
    chain?: any;
  }

export const calTxData = ({ abi, functionName, args }: { abi: Abi | any; functionName: string; args?: any[] }) => {
  const data = encodeFunctionData({
    abi,
    functionName,
    args: args || [],
  });

  return data;
};

export const decodeResultData = ({
  abi,
  functionName,
  data,
}: {
  abi: Abi | any;
  functionName: string;
  data: string;
}) => {
  const decodedData = decodeFunctionResult({
    abi,
    functionName,
    data: data as `0x${string}`,
  });

  return decodedData;
};

// {
//   "eventName": "CreateIncreaseMarketOrder",
//   "args": {
//       "user": "0x2D3330a520eb23CF207B1deF87AeACf03466Aa51",
//   }
// }
export const decodeEventData = ({
  abi,
  data,
  topics,
}: {
  abi: Abi | any;
  data: string;
  topics: string[];
}): {
  eventName: string;
  args: any;
} => {
  const decodedData = decodeEventLog({
    abi,
    data: data as any,
    topics: topics as any,
  });

  return decodedData;
};

export const decodeEventDataWithFunctionName = ({
  abi,
  eventName,
  topics,
}: {
  abi: Abi | any;
  eventName: string;
  topics: string[];
}) => {
  const decodedData = decodeEventLog({
    abi,
    eventName,
    topics: topics as any,
  });

  return decodedData;
};

export const txAwait = async (hash: string | `0x${string}`) => {
  if (!hash) {
    throw new Error('Invalid hash');
  }
  try {
    const transaction = await txPublicClient.waitForTransactionReceipt({
      hash: hash as `0x${string}`,
    });
    // console.log('txAwait', transaction);
    if (transaction.status !== 'success') {
      throw new Error('Transaction Failed');
    }
    return transaction;
  } catch (e) {
    throw e;
  }
};

export const sendTx = async ({ walletClient, to, account, value, data, chain }: SendTxInterface) => {
  try {
    let p: any = {
      to,
      value,
      data,
      chain: chainId[0],
    };
    if (account) {
      p.account = account;
    }
    if (value) {
      p.value = value;
    }
    if (data) {
      p.data = data;
    }
    if (chain) {
      p.chain = chain;
    }

    const hash = await walletClient.sendTransaction({
      ...p,
    });
    return hash;
  } catch (e) {
    throw e;
  }
};
