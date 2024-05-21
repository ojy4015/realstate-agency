// server rendered components

import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property?._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property?.name}
          hashtag={`#${property?.type?.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property?.name}
          hashtag={[`#${property?.type?.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property?.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property?.name}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
