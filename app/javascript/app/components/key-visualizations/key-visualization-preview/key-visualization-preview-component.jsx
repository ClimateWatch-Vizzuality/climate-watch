import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './key-visualization-preview-styles.scss';

class KeyVisualizationPreview extends PureComponent {
  renderContent() {
    const { visualization } = this.props;
    const embedCode = visualization.embed_code;

    if (!embedCode) {
      return '';
    }

    // Embed code could either be a script or a static image
    if (embedCode.slice(0, 1) === '<') {
      return (
        <div
          className={styles.previewContent}
          dangerouslySetInnerHTML={{ __html: visualization.embed_code }} // eslint-disable-line
        />
      );
    }

    return (
      <div className={styles.previewContent}>
        <img src={embedCode} />
      </div>
    );
  }

  render() {
    const { visualization } = this.props;

    if (!visualization) {
      return '';
    }

    return (
      <div className={styles.previewContainer}>
        <div className={styles.previewHeader}>
          <h1>{visualization.title}</h1>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

KeyVisualizationPreview.propTypes = {
  visualization: PropTypes.object
};

export default KeyVisualizationPreview;
