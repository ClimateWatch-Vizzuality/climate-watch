import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';
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

  renderLink() {
    const { visualization } = this.props;
    if (!visualization.blog_link) {
      return '';
    }

    const hostname = new URL(visualization.blog_link).hostname;
    return (
      <div className={styles.previewLink}>
        <a
          href={visualization.blog_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {hostname}
        </a>
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
        </div>
        {this.renderContent()}
        {this.renderLink()}
        {this.renderDescription()}
      </div>
    );
  }
}

KeyVisualizationPreview.propTypes = {
  visualization: PropTypes.object,
  row: PropTypes.number
};

export default KeyVisualizationPreview;
