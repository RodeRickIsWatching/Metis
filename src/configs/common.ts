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

export const pubKey = '0xceb8126fbf7b1e0ff1da5546316fd7f9d1e9d09c8cabef3e8a5502a9f024c151fa376b2949beed2482686e09263d13ef8d2192aad9d8f4e24b0776be5b5faa81'