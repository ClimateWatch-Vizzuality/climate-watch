import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import Button from 'components/button';
import styles from './modal-png-download-styles';

const modalPngDownloadComponent = ({
  modalIdOpen,
  children,
  title,
  selectionSubtitle,
  onRequestClose,
  handlePngDownload,
  id
}) => {
  const modalContentRef = useRef();
  return (
    <Modal
      theme={styles}
      isOpen={id === modalIdOpen}
      onRequestClose={onRequestClose}
      header={<ModalHeader title="Save as image (PNG)" />}
    >
      <div id={`modal-png-content-${id}`} ref={modalContentRef}>
        {/* We are inlining the svg to allow png conversion modules to access the svg DOM
            Imported svg going through webpack (svg-sprite-loader) are rendered inside a #shadow-root */}
        <svg
          id={`modal-png-logo-${id}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 136 13"
          className={styles.logo}
        >
          <path
            fill="#113750"
            fillRule="evenodd"
            d="M11.07 10.693a5.69 5.69 0 0 1-1.957 1.454c-.776.357-1.67.535-2.683.535a6.956 6.956 0 0 1-2.557-.459 6 6 0 0 1-2.034-1.3A6.025 6.025 0 0 1 .49 8.907C.163 8.126 0 7.265 0 6.324c0-.963.166-1.836.498-2.618a5.825 5.825 0 0 1 1.375-1.998A6.084 6.084 0 0 1 3.933.442 7.214 7.214 0 0 1 6.48 0c.844 0 1.674.15 2.49.45.815.3 1.476.74 1.982 1.318L8.995 3.74a2.426 2.426 0 0 0-1.063-.833 3.504 3.504 0 0 0-1.35-.272c-.507 0-.97.093-1.393.28a3.266 3.266 0 0 0-1.088.774c-.304.329-.54.717-.709 1.165a4.137 4.137 0 0 0-.253 1.47c0 .544.084 1.043.253 1.496.169.453.402.841.7 1.165.299.323.656.575 1.072.756.416.181.872.272 1.367.272.574 0 1.074-.113 1.502-.34.427-.227.77-.521 1.03-.884l2.008 1.904zm1.63 1.666V.323h2.902v9.503h4.624v2.533H12.7zm9.273 0V.323h2.903v12.036h-2.903zm16.598 0l.068-8.517h-.05l-3.106 8.517h-2.025l-3.02-8.517h-.051l.067 8.517h-2.717V.323h4.1l2.718 7.718h.067l2.6-7.718h4.168v12.036H38.57zm13.78 0l-.928-2.363h-4.624l-.878 2.363h-3.139L47.795.323h2.801l4.961 12.036h-3.206zm-3.206-8.823l-1.52 4.131h3.005l-1.485-4.131zm11.906-.731v9.554h-2.886V2.805H54.79V.323h9.636v2.482h-3.375zm5.089 9.554V.323h8.033v2.465h-5.249v2.261h4.962v2.329h-4.962v2.499h5.552v2.482H66.14zm13.872-1.7h.034L83.033.306h1.451l2.987 10.353h.034L90.425.306h1.282L88.18 12.342h-1.418L83.758 2.006h-.033L80.72 12.342h-1.418L75.776.306h1.283l2.953 10.353zm13.628 1.683h-1.333L97.47.306h1.181l5.13 12.036h-1.35l-1.316-3.162h-6.177l-1.3 3.162zm1.755-4.284h5.265l-2.632-6.392-2.633 6.392zm13.358 4.284h-1.215V1.394h-4V.306h9.214v1.088h-4v10.948zm15.737-1.938a4.995 4.995 0 0 1-.734.867c-.287.272-.619.51-.996.714a5.569 5.569 0 0 1-1.249.485 5.9 5.9 0 0 1-1.493.178c-.9 0-1.733-.159-2.498-.476a5.904 5.904 0 0 1-1.974-1.318 6.007 6.007 0 0 1-1.291-1.997c-.31-.77-.464-1.615-.464-2.533 0-.918.157-1.762.472-2.533a6.049 6.049 0 0 1 1.308-1.997c.557-.562 1.215-1 1.975-1.318A6.348 6.348 0 0 1 120.018 0c.439 0 .869.045 1.29.136.423.09.82.218 1.19.382a4.97 4.97 0 0 1 1.013.595c.304.233.557.496.76.791l-1.013.748a3.037 3.037 0 0 0-.498-.578 3.385 3.385 0 0 0-.734-.51 4.572 4.572 0 0 0-.92-.357 4.053 4.053 0 0 0-1.071-.136c-.777 0-1.471.142-2.084.425a4.688 4.688 0 0 0-1.561 1.147 5.022 5.022 0 0 0-.98 1.675 5.958 5.958 0 0 0-.337 2.006c0 .703.116 1.371.346 2.006.23.635.56 1.193.987 1.675.428.481.948.864 1.561 1.147.614.283 1.303.425 2.068.425.686 0 1.339-.142 1.957-.425.62-.283 1.137-.737 1.553-1.36l.945.612zM126.98.306h1.215v5.219h6.514V.306h1.215v12.036h-1.215V6.647h-6.514v5.695h-1.215V.306z"
          />
        </svg>
        <div className={styles.title}>{title}</div>
        <div className={styles.chartParamsWrapper}>
          {selectionSubtitle && (
            <span className={styles.chartParams}>{selectionSubtitle}</span>
          )}
        </div>
        <div className={styles.chartWrapper}>{children}</div>
      </div>
      <Button
        className={styles.saveButton}
        onClick={() => {
          handlePngDownload(modalContentRef.current);
        }}
        variant="primary"
      >
        <span className={styles.shareText}>Save</span>
      </Button>
    </Modal>
  );
};

modalPngDownloadComponent.propTypes = {
  modalIdOpen: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  selectionSubtitle: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  handlePngDownload: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default modalPngDownloadComponent;
