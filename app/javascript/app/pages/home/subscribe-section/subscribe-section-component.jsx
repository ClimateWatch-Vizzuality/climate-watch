import React, { PureComponent } from 'react';
import Button from 'components/button';
import background from 'assets/home/subscription-background.png';
import { Input } from 'cw-components';

import theme from './input-theme.scss';
import styles from './subscribe-section-styles.scss';

class SubscribeSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subscribed: false
    };
  }

  subscribe() {
    //TO DO WITH BACKEND
    console.log(`Subscribe email: ${this.state.email}`);
    this.setState({ subscribed: true });
  }

  render() {
    const { subscribed } = this.state;
    return (
      <div className={styles.section} style={{ backgroundImage: `url(${background})` }}>
        <div className={styles.subscribe}>
          <h2>Sign up for Updates</h2>
          {!subscribed ?
            (
              <div className={styles.form}>
                <Input
                  placeholder="Enter your email"
                  theme={theme}
                  icon={false}
                  value={this.state.email}
                  onChange={(value) => this.setState({ email: value })}
                />
                <Button
                  className={styles.button}
                  onClick={() => this.subscribe()}
                >
                  Subscribe
                </Button>
              </div>
            ) : (
              <h3>Thank you for subscribing.</h3>
            )
          }
        </div>
      </div>
    );
  }
}

export default SubscribeSection;
