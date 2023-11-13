import WalletModal from '@/components/WalletModal';
import useWatchAsset from '@/hooks/useWatchAsset';
import { getImageUrl, jumpLink } from '@/utils/tools';
import { styled } from 'styled-components';

const Container = styled.div`
  padding: 22px 32px;
`;

const headerNav = [
  {
    label: 'Developer',
    link: '',
  },
  {
    label: 'Ecosystem',
    link: '',
  },
  {
    label: 'Governance',
    link: '',
  },
  {
    label: 'Company',
    link: '',
  },
  {
    label: 'Bridge',
    link: '',
  },
  {
    label: 'More',
    link: '',
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
        <div onClick={watchMetis}>Add Metis</div>
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
        <img className="pointer" src={getImageUrl('@/assets/images/_global/dark_theme.svg')} />

        <WalletModal />
      </div>
    </Container>
  );
};

export default Header;
