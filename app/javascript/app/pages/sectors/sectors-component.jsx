import React, { PureComponent } from 'react';
import Button from 'components/button';
import Intro from 'components/intro';
import Section from 'components/section';
import introDark from 'styles/themes/intro/intro-dark.scss';
import sectorsScreenshot from 'assets/screenshots/sectors-screenshot';
import cx from 'classnames';
import buttonStyles from 'components/button/button-styles.scss';
import styles from './sectors-styles.scss';

class Sectors extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.wrapper}>
        <Section className={styles.section}>
          <div className={styles.column}>
            <img
              className={styles.imageLeft}
              src={sectorsScreenshot}
              alt="Sectors screenshot"
            />
          </div>
          <div className={cx(styles.column, styles.paddedTeaser)}>
            <Intro
              theme={introDark}
              title="Explore the sectoral cuts"
              description="Check each the sectoral cuts lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
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

export default Sectors;
