import IconDiscord from "@/components/Icons/IconDiscord";
import IconGithub from "@/components/Icons/IconGithub";
import IconMedium from "@/components/Icons/IconMedium";
import IconTelegram from "@/components/Icons/IconTelegram";
import IconTwitter from "@/components/Icons/IconTwitter";
import IconYoutube from "@/components/Icons/IconYoutube";
import { getImageUrl } from "@/utils/tools";
import { styled } from "styled-components";

const links = [
  {
    content: "Platform",
    link: "",
  },
  {
    content: "Knowledge",
    link: "",
  },
  {
    content: "Search",
    link: "",
  },
  {
    content: "Mediakit",
    link: "",
  },
  {
    content: "Ecosystem",
    link: "",
  },
  {
    content: "Community",
    link: "",
  },
  {
    content: "Subscribe",
    link: "",
  },
  {
    content: "Careers",
    link: "",
  },
  {
    content: "Company",
    link: "",
  },
  {
    content: "Terms & conditions",
    link: "",
  },
  {
    content: "Contact",
    link: "",
  },
  {
    content: "Posta job",
    link: "",
  },
];

const medias = [
  {
    content: <IconTwitter />,
    link: "",
  },
  {
    content: <IconTelegram />,
    link: "",
  },
  {
    content: <IconMedium />,
    link: "",
  },
  {
    content: <IconDiscord />,
    link: "",
  },
  {
    content: <IconGithub />,
    link: "",
  },
  {
    content: <IconYoutube />,
    link: "",
  },
];

const Container = styled.div`
  padding: 80px 72px 156px;
  justify-content: center;

  display: flex;
  gap: 80px;

  .l {
    img {
      width: 207px;
    }
  }

  .links {
    div {
      cursor: pointer;
      width: calc(25% - 26px);
      font-size: 16px;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #313146;
      line-height: 25px;
    }
    display: flex;
    flex-wrap: wrap;
    gap: 26px;
  }

  .r {
    display: flex;
    align-items: flex-start;
    
    gap: 8px;
    svg {
      width: 38px;
      height: 38px;
      cursor: pointer;
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <div className="l">
        <img src={getImageUrl("@/assets/images/_global/metis-logo.svg")} />
      </div>
      <div className="links">
        {links.map((i, index) => (
          <div key={index}>{i.content}</div>
        ))}
      </div>
      <div className="r">
        {medias.map((i, index) => (
          <div key={index}>{i.content}</div>
        ))}
      </div>
    </Container>
  );
};
export default Footer;
