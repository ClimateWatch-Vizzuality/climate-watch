import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { timeFormat } from 'd3-time-format';
import { handleAnalytics } from 'utils/analytics';
import StoriesProvider from 'providers/stories-provider';
import storiesDefaultImage from 'assets/backgrounds/stories-default';
import Button from 'components/button';
import { Icon } from 'cw-components';
import yellowWriLogo from 'assets/icons/yellow-wri-logo';
import { WRI_CLIMATE_BLOG } from 'data/constants';
import styles from './stories-styles.scss';

class Stories extends PureComponent {
  handleClickAnalytics = title => {
    handleAnalytics('Home', 'Clicks from home page block', title);
  };
  handleBtnClick = () => {
    window.open(WRI_CLIMATE_BLOG, '_blank');
  };

  handleStoryClick = (link, title) => {
    window.open(link, '_blank');
    this.handleClickAnalytics(title);
  };

  formatTime = timeFormat('%B %d, %Y');

  render() {
    const { stories } = this.props;
    const threeStories = stories.slice(0, 3);

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.storiesHeader}>Highlighted Stories</h2>
        <div className={styles.grid}>
          {threeStories.map((story, index) => {
            const i = index + 1;
            const childClassName = `child-${i}`;
            return (
              <div
                key={story.title}
                role="link"
                tabIndex={0}
                className={cx(styles.story, styles[childClassName])}
                onClick={() => this.handleStoryClick(story.link, story.title)}
                onKeyDown={() => this.handleStoryClick(story.link)}
                style={{
                  backgroundImage: `url(${story.background_image_url ||
                    storiesDefaultImage})`
                }}
              >
                <div className={styles.storyGradient}>
                  <div className={styles.storyDate}>
                    {this.formatTime(new Date(story.published_at))}
                  </div>
                  <div className={styles.storyTitle}>{story.title}</div>
                  <div className={styles.storyDescription}>
                    {story.description}
                  </div>
                  <div className={styles.logoContainer}>
                    <Icon
                      alt="Wri logo"
                      icon={yellowWriLogo}
                      theme={{ icon: styles.icon }}
                    />
                    <span className={styles.text}>
                      by World Resources Institute
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={this.handleBtnClick}
          className={styles.button}
          variant="secondary"
        >
          More Stories
        </Button>
        <StoriesProvider />
      </div>
    );
  }
}

Stories.propTypes = { stories: PropTypes.array };

Stories.defaultProps = { stories: [] };

export default Stories;
