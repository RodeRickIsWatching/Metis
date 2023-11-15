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
}: {
  name: string;
  avatar: string;
  desc?: string;
  address: string;
  pubKey: string;
  url: string;
  media?: string;
}) => {
  return _axios.post('/createvals', {
    data: {
      name,
      avatar,
      desc,
      address,
      pubKey,
      url,
      media,
    },
  });
};

export const getAllUser = () => {
  return _axios.get('/getvals');
};

export const getUser = ({ address }: { address: string }) => {
  return _axios.get('/vals', {
    params: {
      address,
    },
  });
};
