// https://wagmi.sh/react/hooks/useSwitchNetwork
import { useNetwork, useSwitchNetwork } from 'wagmi';
import useAuth from './useAuth';

const useChainWatcher = () => {
  const { chain } = useNetwork();
  
  const { chains, error, isLoading, pendingChainId, switchNetworkAsync, isIdle, status } = useSwitchNetwork();

  const setupNetwork = (forceId?: number) => {
    return switchNetworkAsync?.(forceId || chains[0]?.id);
  };

  const currentStatus = chain?.unsupported;

  // useEffect(() => {
  //   if (chain?.unsupported) {
  //     setupNetwork();
  //   }
  // }, [chain?.unsupported]);

  return { unsupported: currentStatus, isLoading, pendingChainId, setupNetwork };
};

export default useChainWatcher;
