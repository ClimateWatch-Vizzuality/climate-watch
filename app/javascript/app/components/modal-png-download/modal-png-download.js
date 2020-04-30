import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import { isInternetExplorer, isSafariBrowser } from 'utils/utils';
import actions from './modal-png-download-actions';
import reducers, { initialState } from './modal-png-download-reducers';
import mapStateToProps from './modal-png-download-selectors';
import Component from './modal-png-download-component';

const modalPngDownloadContainer = props => {
  const [fromCanvas, setFromCanvas] = useState(false);
  useEffect(() => {
    if (isInternetExplorer() || isSafariBrowser()) {
      setFromCanvas(true);
    }
  }, []);

  function handleCloseModal() {
    const { setModalPngDownload } = props;
    setModalPngDownload({ open: false });
  }

  function filterSaveButton(node) {
    return node.tagName !== 'BUTTON';
  }

  function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.download = 'cw-chart.png';
    link.href = dataUrl;
    link.click();
  }

  function handlePngToImageDownload(node) {
    const nodePosition = node.getBoundingClientRect();
    const padding = 20;
    const { width, height } = nodePosition;
    const config = {
      filter: filterSaveButton,
      backgroundColor: '#fff',
      width: width + 2 * padding,
      height: height + 2 * padding,
      style: {
        padding: `${padding}px`,
        margin: '0 auto'
      }
    };

    toPng(node, config)
      .then(function (dataUrl) {
        downloadImage(dataUrl);
      })
      .catch(error => console.error(error));
  }

  function handlePngToCanvasDownload(node) {
    const nodePosition = node.getBoundingClientRect();
    const { width, height, bottom } = nodePosition;
    const config = { width, height, y: bottom - height };

    html2canvas(node, config)
      .then(function (canvas) {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        downloadImage(dataUrl);
      })
      .catch(error => console.error(error));
  }

  return (
    <Component
      {...props}
      onRequestClose={handleCloseModal}
      handlePngDownload={
        fromCanvas ? handlePngToCanvasDownload : handlePngToImageDownload
      }
    />
  );
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(modalPngDownloadContainer);
