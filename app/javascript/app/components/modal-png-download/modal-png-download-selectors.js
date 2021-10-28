import { createStructuredSelector } from 'reselect';

const getIsModalOpen = ({ modalPngDownload }) => modalPngDownload.modalIdOpen;

export default createStructuredSelector({
  modalIdOpen: getIsModalOpen
});
