import { baseGraphUrl } from '@/configs/common';
import BigNumber from 'bignumber.js';
import { gql, GraphQLClient } from 'graphql-request';

const userTxs = gql`
  query MyQuery($address: String) {
    lockedParams(orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
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

    claimRewardsParams(orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      amount
      id
      sequencerId
      totalAmount
      user
      blockTimestamp
    }

    relockedParams(orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      user
      total
      sequencerId
      id
      amount
      blockTimestamp
    }

    unlockedParams(orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
      user
      total
      sequencerId
      id
      amount
      blockTimestamp
    }

    withrawDelayTimeChangeParams(orderBy: blockTimestamp, orderDirection: desc, where: { user: $address }) {
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

const perpetualClient = new GraphQLClient(baseGraphUrl, {
  headers: {},
});

const fetchUserTx = async (address: string, current?: any, pageSize?: any) => {
  if (!address) return null;
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

  const replacedData = JSON.parse(JSON.stringify(data))

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

  console.log('combinedData', { combinedData, origin: data });
  return { combinedData, origin: data };
};

export default fetchUserTx;
