import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';
import ButtonGroup from 'components/button-group';
import ModalMetadata from 'components/modal-metadata';
import styles from './key-visualization-preview-styles.scss';

class KeyVisualizationPreview extends PureComponent {
  componentDidUpdate() {
    // Need to adjust Flourish embeds to occupy full width
    setTimeout(() => {
      const flourishEmbed = document.querySelector('.flourish-embed');
      if (flourishEmbed) {
        flourishEmbed.style.width = '100%';
      }
    }, 500);
  }

  renderButtonGroup() {
    const {
      onInfoClick,
      onDownloadData,
      onSaveImage,
      visualization
    } = this.props;

    return (
      <ButtonGroup
        key="preview-actions"
        className={styles.buttonGroup}
        buttonsConfig={[
          {
            type: 'info',
            onClick: () => onInfoClick(visualization)
          },
          {
            type: 'downloadCombo',
            options: [
              {
                label: 'Download current data',
                action: () => onDownloadData(visualization)
              },
              {
                label: 'Save as image (PNG)',
                action: () => onSaveImage(visualization)
              }
            ]
          },
          {
            type: 'share',
            shareUrl: '/embed/key-visualizations',
            positionRight: true
          }
        ]}
      />
    );
  }

  renderContent() {
    const { visualization } = this.props;
    const embedCode = visualization.embed_code;

    if (!embedCode) {
      return '';
    }

    // Embed code could either be a script or a static image
    if (embedCode.slice(0, 1) === '<') {
      // Using InnerHTML component to execute <script> tags
      return (
        <InnerHTML
          html={visualization.embed_code}
          className={styles.previewContent}
        />
      );
    }

    return (
      <div className={styles.previewContent}>
        <img src={embedCode} />
      </div>
    );
  }

  renderDescription() {
    const { visualization } = this.props;
    if (!visualization.description) {
      return '';
    }

    return (
      <div
        className={styles.previewDescription}
        dangerouslySetInnerHTML={{ __html: visualization.description }} // eslint-disable-line
      />
    );
  }

  render() {
    const { visualization, row } = this.props;

    if (!visualization) {
      return '';
    }

    const containerStyle = {
      gridRowStart: row
    };

    return (
      <div className={styles.previewContainer} style={containerStyle}>
        <div className={styles.previewHeader}>
          <h1>{visualization.title}</h1>
          {this.renderButtonGroup()}
        </div>
        {this.renderContent()}
        {this.renderDescription()}
        <ModalMetadata />
      </div>
    );
  }
}

KeyVisualizationPreview.propTypes = {
  visualization: PropTypes.object,
  row: PropTypes.number,
  onInfoClick: PropTypes.func.isRequired,
  onDownloadData: PropTypes.func.isRequired,
  onSaveImage: PropTypes.func.isRequired
};

export default KeyVisualizationPreview;
