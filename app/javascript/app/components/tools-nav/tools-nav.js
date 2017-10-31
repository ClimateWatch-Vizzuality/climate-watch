import { connect } from 'react-redux';
import shareIcon from 'assets/icons/share.svg';
import facebookIcon from 'assets/icons/facebook.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import mailIcon from 'assets/icons/mail.svg';
import linkIcon from 'assets/icons/link.svg';
import Component from './tools-nav-component';

const mapStateToProps = () => {
  // const handleCopyUrl = e => {
  //   e.clipboardData.setData('text/plain', 'Hello, world!');
  // };

  const url = location.href;
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
      icon: linkIcon
    }
  ];

  return {
    shareMenuOptions,
    shareIcon
  };
};

export default connect(mapStateToProps, null)(Component);
