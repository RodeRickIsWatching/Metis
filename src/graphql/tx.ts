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

  const combinedData = Object.keys(data)?.reduce((prev: any, next: any) => {
    const curArr = data?.[next]?.map((nii: any) => {
      let amountReadable = BigNumber(nii?.amount || 0)
        .div(1e18)
        .toString();
      if (next === 'relockedParams') {
        const lockConfig = data?.['lockedParams']?.find((i) => i?.sequencerId === nii?.sequencerId);

        console.log('lockConfig', lockConfig, nii)
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
