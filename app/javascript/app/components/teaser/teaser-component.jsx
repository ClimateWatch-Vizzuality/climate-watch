import React, { PureComponent } from 'react';
import Button from 'components/button';
import Intro from 'components/intro';
import Section from 'components/section';
import introDark from 'styles/themes/intro/intro-dark.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import buttonStyles from 'components/button/button-styles.scss';
import styles from './teaser-styles.scss';

class Teaser extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { screenshot, title, description } = this.props;
    return (
      <div className={styles.wrapper}>
        <Section className={styles.section}>
          <div className={cx(styles.column, styles.imageContainer)}>
            <img
              className={styles.imageLeft}
              src={screenshot}
              alt="teaser screenshot"
            />
          </div>
          <div className={cx(styles.column, styles.paddedTeaser)}>
            <Intro theme={introDark} title={title} description={description} />
            <div className={styles.doubleFold}>
              <Button
                disabled
                className={cx(buttonStyles.disabled, styles.wideButton)}
              >
                Coming soon
              </Button>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

Teaser.propTypes = {
  screenshot: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Teaser;
