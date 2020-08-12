import React from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import computedStyleToInlineStyle from 'computed-style-to-inline-style';
import actions from './modal-png-download-actions';
import reducers, { initialState } from './modal-png-download-reducers';
import mapStateToProps from './modal-png-download-selectors';
import Component from './modal-png-download-component';

const modalPngDownloadContainer = props => {
  function handleCloseModal() {
    const { setModalPngDownload } = props;
    setModalPngDownload({ open: false });
  }

  function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.download = 'cw-chart.png';
    link.href = dataUrl;
    link.click();
  }

  function handlePngToCanvasDownload() {
    const node = document.querySelector('#modal-png-content');
    const appNode = document.querySelector('#app');
    const nodePosition = node.getBoundingClientRect();
    const appScroll = appNode ? appNode.getBoundingClientRect().top : 0;
    const padding = 20;
    const { width, height, y, x } = nodePosition;

    // We scale the image to have a better resolution for the final screenshot
    const SCALE = 4;
    const config = {
      y: y - appScroll - padding,
      x: x - padding,
      width: width + padding * 2,
      height: height + padding * 2,
      scale: SCALE,
      onclone: clonedDocument => {
        const logo = clonedDocument.getElementById('modal-png-logo');
        const style = document.createElement('style');
        // Append font to fix unit font on the chart
        style.innerHTML = `
          @font-face {
            font-family: Lato;
            src: url('../fonts/Lato-Regular.woff2') format('woff2'),
            url('../fonts/Lato-Regular.woff') format('woff');
           }
        `;
        clonedDocument.getElementsByTagName('BODY')[0].appendChild(style);
        logo.setAttribute('height', '25px');
        logo.setAttribute('width', '180px');
      }
    };

    // This inline style computing is needed to fix the unit font on the chart
    computedStyleToInlineStyle(node, {
      recursive: true,
      properties: ['font-size', 'font-family', 'font-weight']
    });

    html2canvas(node, config)
      .then(function (canvas) {
        const dataUrl = canvas.toDataURL();
        downloadImage(dataUrl);
      })
      .catch(error => console.error(error));
  }

  return (
    <Component
      {...props}
      onRequestClose={handleCloseModal}
      handlePngDownload={handlePngToCanvasDownload}
    />
  );
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(modalPngDownloadContainer);
