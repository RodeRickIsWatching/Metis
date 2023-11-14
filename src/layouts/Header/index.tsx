import WalletModal from '@/components/WalletModal';
import { isDev } from '@/configs/common';
import useWatchAsset from '@/hooks/useWatchAsset';
import { getImageUrl, jumpLink } from '@/utils/tools';
import { styled } from 'styled-components';

const Container = styled.div`
  padding: 22px 32px;
`;

const headerNav = [
  {
    label: 'Developer',
    link: 'https://www.metis.io/platform',
  },
  {
    label: 'Ecosystem',
    link: 'https://www.metis.io/ecosystem',
  },
  {
    label: 'Governance',
    link: 'https://www.metis.io/ceg',
  },
  {
    label: 'Company',
    link: 'https://www.metis.io/company',
  },
  {
    label: 'Bridge',
    link: 'https://www.metis.io/bridge',
  },
  {
    label: 'Knolewdge',
    link: 'https://www.metis.io/knowledge',
  },
];

const Header = () => {
  const { watchMetis } = useWatchAsset();

  const handleJumpLink = (link: string) => {
    if (!link) return;
    jumpLink(link);
  };

  return (
    <Container className="flex flex-row items-center justify-between">
      <span>
        <img src={getImageUrl('@/assets/images/_global/metis_logo_dark.svg')} />
      </span>

      <div className="flex flex-row gap-20 items-center">
        {isDev ? <div onClick={watchMetis}>Add Metis</div> : null}
        <div className="flex flex-row items-center gap-20">
          {headerNav.map((i) => (
            <div
              className="raleway pointer fz-15 fw-500 color-000"
              onClick={() => handleJumpLink(i?.link)}
              key={i.label}
            >
              {i.label}
            </div>
          ))}
        </div>
        {/* <img className="pointer" src={getImageUrl('@/assets/images/_global/dark_theme.svg')} /> */}

        <WalletModal />
      </div>
    </Container>
  );
};

export default Header;
