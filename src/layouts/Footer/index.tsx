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
    content: "Carrers",
    link: "",
  },
  {
    content: "Search",
    link: "",
  },
  {
    content: "Subscribe",
    link: "",
  },
];

const link2 = [
  {
    content: "Community",
    link: "",
  },
  {
    content: "Company",
    link: "",
  },
  {
    content: "Ecosystem",
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
]

const medias = [
  {
    content: <IconTwitter />,
    img: getImageUrl('@/assets/images/_media/twi.svg'),
    link: "",
  },
  {
    content: <IconTelegram />,
    img: getImageUrl('@/assets/images/_media/telegram.svg'),
    link: "",
  },
  {
    content: <IconMedium />,
    img: getImageUrl('@/assets/images/_media/medium.svg'),
    link: "",
  },
  {
    content: <IconDiscord />,
    img: getImageUrl('@/assets/images/_media/discord.svg'),
    link: "",
  },
  {
    content: <IconGithub />,
    img: getImageUrl('@/assets/images/_media/github.svg'),
    link: "",
  },
  {
    content: <IconYoutube />,
    img: getImageUrl('@/assets/images/_media/you.svg'),
    link: "",
  },
];

const Container = styled.div`
  padding: 52px 200px 156px;
  gap: 80px;

  .l {
    img {
      width: 207px;
    }
  }

  .links {
    div {
      cursor: pointer;
      /* width: calc(25% - 26px); */
      font-size: 16px;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #313146;
      line-height: 25px;
    }
    display: flex;
    /* flex-wrap: wrap; */
    /* gap: 26px; */
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
    <Container className="bg-color-000 flex flex-row justify-between">
      <div className="l flex flex-col gap-45">
        <img src={getImageUrl("@/assets/images/_global/metis_logo_light.svg")} />

        <div className="links flex flex-row items-center gap-120 justify-between">
        <div className="flex flex-col gap-12">
          {links.map((i, index) => (
            <div className="fz-14 fw-400 color-fff pointer" key={index}>{i.content}</div>
          ))}
        </div>
        <div className="flex flex-col gap-12">
          {
            link2.map((i, index) => (
              <div className="fz-14 fw-400 color-fff pointer" key={index}>{i.content}</div>
            ))
          }
        </div>
      </div>
      </div>
      
      <div className="r">
        {medias.map((i, index) => (
          <div key={index} className="pointer">
            <img className="s-50" src={i.img} />
          </div>
        ))}
      </div>
    </Container>
  );
};
export default Footer;
