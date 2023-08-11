import useAuth from "@/hooks/useAuth";
import { filterHideText, getImageUrl } from "@/utils/tools";
import classNames from "classnames";
import { styled } from "styled-components";

const Container = styled.div`
  span {
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #333347;
    line-height: 21px;
  }
  img {
    width: 12px;
    height: 12px;
  }
`;

const CopyAddress = ({
  addr,
  className,
  reverse,
}: {
  addr?: string;
  className?: any;
  reverse?: boolean;
}) => {
  const { address } = useAuth(true);

  return (
    <Container
      className="flex flex-row items-center gap-8"
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      <span
        className={classNames("copy-content", {
          className,
        })}
      >
        {filterHideText(addr || (address as string), 6, 4)}
      </span>

      <img src={getImageUrl("@/assets/images/_global/ic_copy.svg")} />
    </Container>
  );
};

export default CopyAddress;
