import { createStructuredSelector } from 'reselect';

const getIsModalOpen = ({ modalPngDownload }) => modalPngDownload.isOpen;

export default createStructuredSelector({
  isOpen: getIsModalOpen
});
