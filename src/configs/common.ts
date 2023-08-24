import { getImageUrl } from "@/utils/tools";
import LOCK_ABI from "@/configs/abi/lock.json";
import { erc20ABI, goerli, mainnet } from "wagmi";

export const MAX_ALLOWANCE =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const isProd = import.meta.env.MODE === "production";

export const isDev = import.meta.env.MODE === "development";

export const medias = [
  {
    icon: getImageUrl("@/assets/images/medias/twitter.svg"),
    link: "https://twitter.com/SubstanceX_",
    label: "Twitter",
  },
  {
    icon: getImageUrl("@/assets/images/medias/discord.svg"),
    link: "https://discord.gg/substancex",
    label: "Discord",
  },
  {
    icon: getImageUrl("@/assets/images/medias/telegram.svg"),
    link: "https://t.me/Substancexofficial",
    label: "Telegram",
  },
  {
    icon: getImageUrl("@/assets/images/medias/medium.svg"),
    link: "https://medium.com/@SubstanceX",
    label: "Medium",
  },
];

export const { VITE_APP_LOCK_CONTRACT, VITE_APP_METIS_TOKEN } = import.meta.env;
export const lockContract = { address: VITE_APP_LOCK_CONTRACT, abi: LOCK_ABI };
export const depositToken = { address: VITE_APP_METIS_TOKEN, abi: erc20ABI };

export const basicChainId = isProd ? mainnet.id : goerli.id

export const pubKey = '0xaa507c6f682049403a8408d761b60a6444c3a5c2dc54fd589bc5dc331f42065115e7517f8481472a14fdba79e586a18fb488cb36c6475a26b2f6f430b88d09b1'