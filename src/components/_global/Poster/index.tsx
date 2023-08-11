import * as React from 'react';
import { Modal, message } from '@/components';
import clipboard from 'copy-to-clipboard';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share';
import styled from 'styled-components';
import usePoster from './usePoster';
import type { IShareData } from './usePoster';
import { jumpLink, getImageUrl } from '@/utils/tools';

const InviteModal = styled.div`
  width: 528px;
  .canvas {
    padding: 24px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .test {
      width: 100%;
      height: 359px;
    }
  }
  .share {
    gap: 16px;
    padding: 0px 24px 24px 24px;
    .button,
    button {
      flex: 1;
      height: 40px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.04);
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
`;

interface IPosterProps {
  visible: boolean;
  onCancel: () => void;
  shareData: IShareData;
}

const Poster = (props: IPosterProps) => {
  const { visible, onCancel, shareData } = props;

  const [checked, setChecked] = React.useState<boolean>(true);
  const [baseRadio, setBaseRadio] = React.useState<0 | 1>(0);

  const [posterImg, setPosterInfo, downloadPoster] = usePoster();
  const [referralShare, setReferralShare] = React.useState<string>('');

  // React.useEffect(() => {
  //   setPosterInfo({
  //     ...shareData,
  //     showAmount: checked,
  //     shareWay: baseRadio,
  //     locale: 'en-US',
  //   });
  //   setReferralShare(`https://baidu.com/new/signup/${shareData.inviteCode}`);
  // }, [setPosterInfo, shareData, checked, baseRadio]);

  return (
    <React.Fragment>
      <Modal visible={visible} title="Share" onClose={onCancel}>
        <InviteModal>
          <div className="canvas">
            {/* {posterImg && <img src={posterImg} alt="poster" className={baseRadio === 0 ? 'square' : 'rectangle'} />} */}
            <img className="test" src={getImageUrl('@/assets/images/_global/canvas_tset.jpg')} alt="icon" />
          </div>
          <div className="share flex flex-row items-center justify-between">
            <div
              className="button flex flex-row items-center justify-center"
              onClick={() => {
                clipboard(referralShare);
                message.success('Link copied!');
              }}
            >
              <img src={getImageUrl('@/assets/images/_global/icon-share_link.svg')} alt="icon" />
            </div>
            <div className="button flex flex-row items-center justify-center" onClick={downloadPoster}>
              <img src={getImageUrl('@/assets/images/_global/icon-share_download.svg')} alt="icon" />
            </div>
            <TwitterShareButton url={referralShare}>
              <div className="button flex flex-row items-center justify-center">
                <img src={getImageUrl('@/assets/images/_global/icon-share_twitter.svg')} alt="icon" />
              </div>
            </TwitterShareButton>
            <FacebookShareButton url={referralShare}>
              <div className="button flex flex-row items-center justify-center">
                <img src={getImageUrl('@/assets/images/_global/icon-share_facebook.svg')} alt="icon" />
              </div>
            </FacebookShareButton>
            <TelegramShareButton url={referralShare}>
              <div className="button flex flex-row items-center justify-center">
                <img src={getImageUrl('@/assets/images/_global/icon-share_telegram.svg')} alt="icon" />
              </div>
            </TelegramShareButton>
            <WhatsappShareButton url={referralShare}>
              <div className="button flex flex-row items-center justify-center">
                <img src={getImageUrl('@/assets/images/_global/icon-share_whatsup.svg')} alt="icon" />
              </div>
            </WhatsappShareButton>
          </div>
        </InviteModal>
      </Modal>
    </React.Fragment>
  );
};

export default React.memo(Poster);
