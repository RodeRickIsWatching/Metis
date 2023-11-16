// 获取最近出的区块和时间
// todo 优化
import { blockGraphUrl } from '@/configs/common';
import { gql, GraphQLClient } from 'graphql-request';

const blocks = gql`
  query MyQuery($from: String, $to: String) {
    blocks(first: 1, orderDirection: desc, orderBy: number) {
      number
      timestamp
    }
  }
`;

const perpetualClient = new GraphQLClient(blockGraphUrl, {
  headers: {},
});

const fetchLatestBlockTimestamp = async () => {
  // 查询block服务查询时间
  const blockData: any = await perpetualClient.request(blocks);

//   const timestamp = blockData?.blocks?.[0]?.timestamp;

  return blockData?.blocks?.[0];
};

export default fetchLatestBlockTimestamp;
