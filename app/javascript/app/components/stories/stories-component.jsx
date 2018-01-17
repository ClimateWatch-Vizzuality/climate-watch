import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './stories-styles.scss';

class Stories extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { stories, handleClickAnalytics } = this.props;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Highlighted Stories</h2>
        <div className={styles.grid}>
          {stories.map(story => (
            <a
              key={story.id}
              className={styles.story}
              style={{ backgroundImage: `url(${story.image})` }}
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClickAnalytics(story.title)}
            >
              {story.title}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  stories: PropTypes.array.isRequired,
  handleClickAnalytics: PropTypes.func.isRequired
};

Stories.defaultProps = {
  stories: []
};

export default Stories;
