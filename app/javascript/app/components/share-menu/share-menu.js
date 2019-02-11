import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import shareIcon from 'assets/icons/share.svg';
import facebookIcon from 'assets/icons/facebook.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import mailIcon from 'assets/icons/mail.svg';
import linkIcon from 'assets/icons/link.svg';
import codeIcon from 'assets/icons/code.svg';
import copy from 'copy-to-clipboard';
import Component from './share-menu-component';

const mapStateToProps = (state, { path }) => {
  const { origin, pathname, search, hash } = location;
  const url = origin + (path || pathname) + search + hash;
  const copyUrl = () => copy(url);
  const iframeCode = `<iframe src="${url}" frameborder="0" style="height: 600px; width: 1230px"></iframe>`;
  const copyCode = () => copy(iframeCode);
  const isNavMenu = !path;
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
      label: path ? 'Copy Embed URL' : 'Copy Link',
      icon: linkIcon,
      action: copyUrl
    }
  ];

  if (!isNavMenu) {
    shareMenuOptions.push({
      label: 'Copy Embed code',
      icon: codeIcon,
      action: copyCode
    });
  }
  return {
    shareMenuOptions,
    shareIcon
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
