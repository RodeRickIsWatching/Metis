import { publicProvider } from '@wagmi/core/providers/public';
import { InjectedConnector } from '@wagmi/core';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';


import { isProd } from './common';
import { goerli } from 'viem/chains';

export const chainId = isProd ? [mainnet, goerli] : [goerli, mainnet];

export const injectedConnector = new InjectedConnector({
  chains: [...chainId],
  // options: {
  //   getProvider: () => ({
  //     ...ethersProvider,
  //     emit: ethersProvider?.emit,
  //     request: ethersProvider.send,
  //     isMetaMask: false,
  //   }),
  // },
});


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...chainId],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  connectors: [injectedConnector],
  publicClient,
  // provider: getDefaultProvider(),
  webSocketPublicClient,
});

// const transport = webSocket(wssUrl, {
//   timeout: 60_000,
// });

export const txPublicClient = createPublicClient({
  chain: chainId?.[0],
  // transport,
  transport: http(),
});

export { config, WagmiConfig as WagmiProvider, publicClient };
