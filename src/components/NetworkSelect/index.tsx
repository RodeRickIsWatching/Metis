import { styled } from "styled-components";
import { Button } from "..";
import { getImageUrl } from "@/utils/tools";
import useChainWatcher from "@/hooks/useChainWatcher";

const Container = styled.div`
  .f-14 {
    font-size: 14px;
    line-height: 21px;
  }

  .p-14-53 {
    padding: 14px 53px;
  }
`;

const NetworkSelect = () => {
  const { unsupported, isLoading, pendingChainId, setupNetwork } =
    useChainWatcher();

  if (!unsupported) return null;

  return (
    <Container>
      <Button type="short" onClick={setupNetwork}>
        <div className="p-14-53 flex flex-row items-center gap-10">
          <img
            src={getImageUrl("@/assets/images/_global/ic_wrong_network.svg")}
          />
          <div className="f-14">Network</div>
        </div>
      </Button>
    </Container>
  );
};

export default NetworkSelect;
