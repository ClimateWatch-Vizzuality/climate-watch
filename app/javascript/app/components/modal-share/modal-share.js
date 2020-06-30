import { connect } from 'react-redux';
import shareIcon from 'assets/icons/share.svg';
import facebookIcon from 'assets/icons/facebook.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import mailIcon from 'assets/icons/mail.svg';
import linkIcon from 'assets/icons/link.svg';
import codeIcon from 'assets/icons/code.svg';
import copy from 'copy-to-clipboard';
import actions from './modal-share-actions';
import reducers, { initialState } from './modal-share-reducers';
import Component from './modal-share-component';

const mapStateToProps = (state, { shouldEmbedQueryParams = true }) => {
  const { isOpen: isModalOpen, sharePath } = state.modalShare;
  const { origin, pathname, search, hash } = location;
  const queryParams = shouldEmbedQueryParams ? search + hash : '';
  const embedUri = `/embed${sharePath || pathname.replace('/embed', '')}`;
  const url = `${origin}${embedUri}${encodeURIComponent(queryParams)}`;
  const copyUrl = () => copy(url);
  const iframeCode = `<iframe src="${url}" frameborder="0" style="height: 600px; width: 1230px"></iframe>`;
  const copyCode = () => copy(iframeCode);
  const shareMenuOptions = [
    {
      key: 'socialOptions',
      options: [
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
        }
      ]
    },
    {
      key: 'embedOptions',
      options: [
        {
          label: 'Copy Embed URL',
          icon: linkIcon,
          action: copyUrl
        },
        {
          label: 'Copy Embed code',
          icon: codeIcon,
          action: copyCode
        }
      ]
    }
  ];

  return {
    shareMenuOptions,
    shareIcon,
    isModalOpen
  };
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(actions.setShareModal({ open: false }))
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, mapDispatchToProps)(Component);
