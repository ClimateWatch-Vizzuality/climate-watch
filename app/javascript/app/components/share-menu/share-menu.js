import { connect } from 'react-redux';
import shareIcon from 'assets/icons/share.svg';
import facebookIcon from 'assets/icons/facebook.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import mailIcon from 'assets/icons/mail.svg';
import linkIcon from 'assets/icons/link.svg';
import copy from 'copy-to-clipboard';
import Component from './share-menu-component';

const mapStateToProps = (state, { hash }) => {
  const { origin, pathname } = location;
  let url = origin + pathname;
  if (hash) url = `${url}#${hash}`;
  const copyUrl = () => copy(url);
  const shareMenuOptions = [
    {
      label: 'Email',
      icon: mailIcon,
      link: `mailto:?subject=Climate%20Watch&body=${url}`
    },
    {
      label: 'Facebook',
      icon: facebookIcon,
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    {
      label: 'Twitter',
      icon: twitterIcon,
      link: `https://twitter.com/intent/tweet?url=${url}`
    },
    {
      label: 'Copy link',
      icon: linkIcon,
      action: copyUrl
    }
  ];

  return {
    shareMenuOptions,
    shareIcon
  };
};

export default connect(mapStateToProps, null)(Component);
