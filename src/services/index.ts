import { serviceUrl } from '@/configs/common';
import axios from 'axios';

const _axios = axios.create({
  baseURL: `${serviceUrl}`,
  timeout: 30000,
});

_axios.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    return response?.data?.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
_axios.interceptors.request.use((config) => {
  return config;
});

// Routes
// r.GET("/getvals", controllers.FindVals)
// r.GET("/vals/:id", controllers.FindVal)
// r.POST("/createvals", controllers.CreateVal)
// r.PATCH("/vals/:id", controllers.UpdateVal)
// r.DELETE("/vals/:id", controllers.DeleteVal)

// type ValInfo struct {
//     Name    string `json:"name"`
//     Avartar string `json:"avatar"`
//     Desc    string `json:"desc"`
//     Address string `json:"address"`
//     PubKey  string `json:"pubkey"`
//     Url     string `json:"url"`
//     Media   string `json:"media"`
//    }

export const createUser = ({
  name,
  avatar,
  desc,
  address,
  pubKey,
  url,
  media,
  walletAddress,
}: {
  name: string;
  avatar: string;
  desc?: string;
  address: string;
  pubKey: string;
  url: string;
  media?: string;
  walletAddress?: string;
}) => {
  if (!address) return;
  return _axios.post('/createval', {
    name,
    avatar,
    desc,
    address,
    pubKey,
    url,
    media,
    walletAddress,
    seq_addr: address,
  });
};

export const updateUser = ({
  id,
  name,
  avatar,
  desc,
  address,
  pubKey,
  url,
  media,
  walletAddress,
}: {
  id: string;
  name: string;
  avatar: string;
  desc?: string;
  address: string;
  pubKey: string;
  url: string;
  media?: string;
  walletAddress?: string;
}) => {
  if (!address || !id) return;
  return _axios.patch(`/updateval/${id}`, {
    name,
    avatar,
    desc,
    address,
    pubKey,
    url,
    media,
    walletAddress,
    seq_addr: address,
  });
};

export const getAllUser = async () => {
  try {
    const res: any = await _axios.get('/getvals');

    if (!res?.length) return null;
    const resolvedResult = res
      ?.filter((i: { address: any }) => i.address)
      .reduce((prev: any, next: { address: string }) => {
        return { ...prev, [next?.address?.toLowerCase()]: next };
      }, {});

    return resolvedResult;
  } catch (e) {
    throw new Error('Server Error');
  }
};

export const getUser = ({ address }: { address: string }) => {
  return _axios.get('/getval', {
    params: {
      id: address,
    },
  });
};
