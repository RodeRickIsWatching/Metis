import { baseGraphUrl } from '@/configs/common';
import BigNumber from 'bignumber.js';
import { gql, GraphQLClient } from 'graphql-request';

const userTxs = gql`
  query MyQuery($address: String) {
    lockedParams(first: 1000, orderBy: blockTimestamp, orderDirection: desc, where: { signer: $address }) {
      activationBatch
      amount
      id
      nonce
      sequencerId
      signer
      signerPubkey
      total
      user
      blockTimestamp
    }

    claimRewardsParams(first: 1000, orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      amount
      id
      sequencerId
      totalAmount
      user
      blockTimestamp
    }

    relockedParams(first: 1000, orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      user
      total
      sequencerId
      id
      amount
      blockTimestamp
    }

    unlockedParams(first: 1000, orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      user
      total
      sequencerId
      id
      amount
      blockTimestamp
    }
    unlockInitParams(first: 1000, orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      amount
      block
      blockTimestamp
      deactivationBatch
      deactivationTime
      id
      nonce
      sequencerId
      unlockClaimTime
      user
    }

    withrawDelayTimeChangeParams(
      first: 1000
      orderBy: blockTimestamp
      orderDirection: desc
      where: { user: $address }
    ) {
      user
      oldWithrawDelayTime
      newWithrawDelayTime
      id
      blockTimestamp
    }

    # lockUpdateParams(orderDirection: desc, where: { user: $address }) {
    #   id
    #   newAmount
    #   nonce
    #   sequencerId
    #   user
    # }
  }
`;

const fetchUserTx = async (address: string, chainId: number, current?: any, pageSize?: any) => {
  if (!address) throw new Error('Invalid Address');
  if (!chainId || !baseGraphUrl?.[chainId.toString()]) throw new Error('Invalid Client');
  const perpetualClient = new GraphQLClient(baseGraphUrl?.[chainId.toString()], {
    headers: {},
  });

  const _address = address.toString().toLowerCase();
  const _current = current || 0;
  const _pageSize = pageSize || 1000;
  const data: any = await perpetualClient.request(userTxs, {
    address: _address,
    current: +_current,
    pageSize: +_pageSize,
  });

  // lock事件 amount为基础锁仓量
  // 后续relock事件 total减去前一个则为delta
  // 后续升级至graph
  const sortedRelockData = data?.relockedParams?.sort((a, b) => +a?.blockTimestamp - +b?.blockTimestamp);

  const relockData = sortedRelockData?.map((i, index) => {
    if (index === 0 || i?.sequencerId !== data?.relockedParams?.[index - 1]?.sequencerId) {
      const lockAmount = data?.lockedParams?.find((j) => j?.sequencerId === i?.sequencerId);
      return {
        ...i,
        deltaAmount: BigNumber(i?.total)
          .minus(lockAmount?.amount || 0)
          .toString(),
        deltaAmountReadable: BigNumber(i?.total)
          .minus(lockAmount?.amount || 0)
          .div(1e18)
          .toString(),
      };
    } else {
      return {
        ...i,
        deltaAmount: BigNumber(i?.total)
          .minus(data?.relockedParams?.[index - 1]?.total || 0)
          .toString(),
        deltaAmountReadable: BigNumber(i?.total)
          .minus(data?.relockedParams?.[index - 1]?.total || 0)
          .div(1e18)
          .toString(),
      };
    }
  });
  // console.log('relockData', data?.lockedParams, relockData);

  const replacedData = JSON.parse(JSON.stringify(data));

  replacedData.relockedParams = relockData;

  const combinedData = Object.keys(replacedData)?.reduce((prev: any, next: any) => {
    const curArr = replacedData?.[next]?.map((nii: any) => {
      let amountReadable = BigNumber(nii?.amount || 0)
        .div(1e18)
        .toString();
      if (next === 'relockedParams') {
        const lockConfig = replacedData?.['lockedParams']?.find((i) => i?.sequencerId === nii?.sequencerId);

        console.log('lockConfig', lockConfig, nii);
        amountReadable = BigNumber(nii?.total).minus(lockConfig?.amount).div(1e18).toString();
      }

      const c = {
        ...nii,
        type: next.replaceAll('Params', ''),
        amountReadable,
        symbol: 'METIS',
      };
      return c;
    });
    // console.log('curArr',data?.[next],curArr)
    return [...prev, ...curArr];
  }, []);

  return { combinedData, origin: data };
};

export default fetchUserTx;
