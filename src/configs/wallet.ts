import { publicProvider } from '@wagmi/core/providers/public';
import { InjectedConnector } from '@wagmi/core';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';


import { isProd } from './common';
import { goerli, holesky } from 'viem/chains';
console.log('holesky', holesky)
export const chainId = isProd ? [holesky, mainnet] : [goerli, mainnet];

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
  // webSocketPublicClient,
});

// const transport = webSocket(wssUrl, {
//   timeout: 60_000,
// });

export const mainnetTxPublicClient = createPublicClient({
  chain: mainnet,
  // transport,
  transport: http(),
});
export const goerliTxPublicClient = createPublicClient({
  chain: goerli,
  // transport,
  transport: http(),
});
export const holeskyTxPublicClient = createPublicClient({
  chain: holesky,
  // transport,
  transport: http(),
});

export const txPublicClients = {
  [goerli.id.toString()]: goerliTxPublicClient,
  [mainnet.id.toString()]: mainnetTxPublicClient,
  [holesky.id.toString()]: holeskyTxPublicClient,
}

export { config, WagmiConfig as WagmiProvider, publicClient };
