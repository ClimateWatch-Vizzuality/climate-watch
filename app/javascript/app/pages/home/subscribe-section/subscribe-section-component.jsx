import React from 'react';
import Button from 'components/button';
import background from 'assets/home/subscription-background.png';
import styles from './subscribe-section-styles.scss';

const SubscribeSection = () => (
  <div className={styles.section} style={{ backgroundImage: `url(${background})` }}>
    <div className={styles.subscribe}>
      <h2>Sign up for Updates</h2>
      <Button className={styles.button} link={'/about/contact'}>
        Subscribe
      </Button>
    </div>
  </div>
);

export default SubscribeSection;
