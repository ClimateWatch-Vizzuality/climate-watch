import React from 'react';
import { connect } from 'react-redux';
import actions from './modal-png-download-actions';
import reducers, { initialState } from './modal-png-download-reducers';
import mapStateToProps from './modal-png-download-selectors';
import Component from './modal-png-download-component';

const modalPngDownloadContainer = props => {
  const handleCloseModal = () => {
    const { toggleModalPNGDownload } = props;
    toggleModalPNGDownload({ open: false });
  };

  return <Component {...props} onRequestClose={handleCloseModal} />;
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(modalPngDownloadContainer);
