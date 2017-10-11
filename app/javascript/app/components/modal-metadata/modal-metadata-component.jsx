import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalHeader } from 'components/modal';

class ModalMetadata extends PureComponent {
  getContent() {
    const { link, sourceOrganization, summary, description } = this.props.data;
    const content = [];
    if (sourceOrganization) {
      content.push(
        <p key="source">Source organization: {sourceOrganization}</p>
      );
    }
    if (summary) content.push(<p key="summary">Summary: {summary}</p>);
    if (description) { content.push(<p key="description">Description: {description}</p>); }
    if (link) {
      content.push(
        <a key="link" href={link}>
          {link}
        </a>
      );
    }
    return content;
  }

  render() {
    const { onRequestClose, isOpen, title, data } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        {title && <ModalHeader title={title} />}
        {data && this.getContent()}
      </Modal>
    );
  }
}

ModalMetadata.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ModalMetadata;
