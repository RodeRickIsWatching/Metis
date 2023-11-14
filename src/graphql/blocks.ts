import { blockGraphUrl } from '@/configs/common';
import { gql, GraphQLClient } from 'graphql-request';

const userTxs = gql`
  query MyQuery($address: String) {
    userEpochParams(first: 1000, orderDirection: desc, orderBy: epochId, where: { signer: $address }) {
    signer
    id
    epochId
    endBlock
    startBlock
    blockTimestamp
    }
  }
`;

const perpetualClient = new GraphQLClient(blockGraphUrl, {
  headers: {},
});

const fetchBlock = async (address: string, current?: any, pageSize?: any) => {
  if (!address) return null;
  const _address = address.toString().toLowerCase();
  const _current = current || 0;
  const _pageSize = pageSize || 1000;
  const data: any = await perpetualClient.request(userTxs, {
    address: _address,
    current: +_current,
    pageSize: +_pageSize,
  });

  console.log('data', data)
  return data;
};

export default fetchBlock;
