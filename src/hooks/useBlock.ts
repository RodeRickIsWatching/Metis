import fetchLatestBlockTimestamp from '@/graphql/getLatestBlock';
import { recoilLatestBlock } from '@/models';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface Block {
  timestamp: number;
  number: number;
}

const useBlock = () => {
  const [latestBlock, setLatestBlock] = useRecoilState(recoilLatestBlock);
  const props = useRequest(fetchLatestBlockTimestamp, { manual: true, pollingInterval: 10000 });

  const handleBlock = (data: Block) => {
    setLatestBlock(data);
  };

  useEffect(() => {
    if (props?.data) {
      handleBlock(props?.data);
    }
  }, [props?.data]);

  return { ...props, block: latestBlock };
};

export default useBlock;
