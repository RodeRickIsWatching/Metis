import { baseGraphUrl } from '@/configs/common';
import BigNumber from 'bignumber.js';
import { gql, GraphQLClient } from 'graphql-request';

const userTxs = gql`
  query MyQuery {
    lockedUserParams {
      amount
      block
      fromTimestamp
      id
      signerPubkey
      user
    }
  }
`;

const perpetualClient = new GraphQLClient(baseGraphUrl, {
  headers: {},
});

const fetchOverview = async () => {
  const data: any = await perpetualClient.request(userTxs);
  return data;
};

export default fetchOverview;
