import { atom } from 'recoil';

export const recoilSequencerId = atom<string>({
  key: 'sequencerId',
  default: '',
});


export const recoilBalance = atom<any>({
  key: 'balance',
  default: null,
});


export const recoilAllowance = atom<any>({
  key: 'allowance',
  default: null,
});


export const recoilSequencerInfo = atom<any>({
  key: 'sequencerInfo',
  default: null,
});



export const recoilSequencerTotalInfo = atom<any>({
  key: 'sequencerTotalInfo',
  default: null,
});
