// https://wagmi.sh/react/hooks/useSwitchNetwork
import { useEffect } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const useChainWatcher = () => {
  const { chain } = useNetwork();

  const { chains, error, isLoading, pendingChainId, switchNetwork, isIdle, status } = useSwitchNetwork();

  const setupNetwork = () => {
    if (chain?.unsupported) {
      switchNetwork?.(chains[0]?.id);
    }
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
