import { styled } from 'styled-components';
import { Select } from '..';
import useChainWatcher from '@/hooks/useChainWatcher';
import { useEffect, useMemo, useState } from 'react';
import { mainnet, useNetwork } from 'wagmi';
import { goerli, holesky, sepolia } from 'viem/chains';
import { isProd } from '@/configs/common';


const Container = styled.div`
  .f-14 {
    font-size: 14px;
    line-height: 21px;
  }

  .p-14-53 {
    padding: 14px 53px;
  }
`;

const options = isProd ? [
  { ...sepolia, label: sepolia.name, value: sepolia.id, name: sepolia.name },
  // { ...holesky, label: holesky.name, value: holesky.id, name: holesky.name },
  { ...mainnet, label: mainnet.name, value: mainnet.id, name: mainnet.name },
] : [
  { ...goerli, label: goerli.name, value: goerli.id, name: goerli.name },
  { ...mainnet, label: mainnet.name, value: mainnet.id, name: mainnet.name },
];

const NetworkSelect = () => {
  const { unsupported, isLoading, pendingChainId, setupNetwork } =
    useChainWatcher();

  const { chain } = useNetwork();


  const [curOption, setCurOption] = useState();

  const curOptionName = useMemo(() => options.find(i => i.value === curOption)?.name, [curOption]);

  const handleOption = (ele: any) => {
    setCurOption(ele?.value);
  };
  const handleChange = async (ele: any) => {
    if (!ele?.value) return;
    try {
      await setupNetwork(ele?.value);
    } catch (e) { }
  };


  useEffect(() => {
    const t = options.find(i => i.id === chain?.id);
    if (t) {
      handleOption(t);
    }
  }, [chain?.id]);


  useEffect(() => {
    if (unsupported) {
      setupNetwork();
    } else if (!curOption) {
      if (chain?.id) {
        handleChange({ value: chain.id });
      } else {
        handleChange(options?.[0]);
      }
    }
  }, [curOption, unsupported, chain?.id]);

  return (
    <Container className="h-full">
      <Select
        className="h-full bg-color-00D2FF radius-40  pl-18 pr-60 z-0"
        style={{ transform: 'translate(25%, 0)' }}
        triggerClassName="w-full pl-0"
        type="primary"
        options={options}
        arrowPlacement="left"
        placement="right"
        value={curOption}
        renderSelector={
          <div className="fz-15 fw-500 color-000">{curOptionName}</div>
        }
        allowClear={false}
        placeholder={<div className="fz-15 fw-500 color-000">Wrong network</div>}
        onChange={(ele) => {
          handleChange?.(ele);
        }}
      />
      {/* <Button type="short" onClick={setupNetwork}>
        <div className="p-14-53 flex flex-row items-center gap-10">
          <img
            src={getImageUrl("@/assets/images/_global/ic_wrong_network.svg")}
          />
          <div className="f-14">Wrong Network</div>
        </div>
      </Button> */}
    </Container>
  );
};

export default NetworkSelect;
