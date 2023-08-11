import { InjectedConnector } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import {
  WagmiConfig,
  configureChains,
  createClient,
  goerli,
  mainnet,
} from "wagmi";
import { isProd } from "./common";

export const chainId = isProd ? [mainnet] : [goerli];

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

const { provider, webSocketProvider } = configureChains(
  [...chainId],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  // connectors: [magicAuthConnector, particleConnector as any, injectedConnector, web3AuthConnector],
  connectors: [injectedConnector],
  provider,
  // provider: getDefaultProvider(),
  webSocketProvider,
});

export { client, WagmiConfig as WagmiProvider };
