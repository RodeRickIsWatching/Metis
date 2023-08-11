import NetworkSelect from "@/components/NetworkSelect";
import WalletModal from "@/components/WalletModal";
import useWatchAsset from "@/hooks/useWatchAsset";
import { getImageUrl } from "@/utils/tools";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 22px 32px;
`;
const Header = () => {
  const { watchMetis } = useWatchAsset();

  return (
    <Container className="flex flex-row items-center justify-between">
      <span>
        <img src={getImageUrl("@/assets/images/_global/metis-logo.svg")} />
      </span>

      <div className="flex flex-row gap-20 items-center">
        <div onClick={watchMetis}>Add Metis</div>
        <NetworkSelect />
        <WalletModal />
      </div>
    </Container>
  );
};

export default Header;
