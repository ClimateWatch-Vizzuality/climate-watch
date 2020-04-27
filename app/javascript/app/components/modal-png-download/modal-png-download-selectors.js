import { createStructuredSelector } from 'reselect';

const getIsModalOpen = ({ modalPngDownload }) => modalPngDownload.isOpen;
const getModalHeader = ({ modalPngDownload }) => modalPngDownload.header;
const getModalDescription = ({ modalPngDownload }) =>
  modalPngDownload.description;

export default createStructuredSelector({
  isOpen: getIsModalOpen,
  header: getModalHeader,
  description: getModalDescription
});
