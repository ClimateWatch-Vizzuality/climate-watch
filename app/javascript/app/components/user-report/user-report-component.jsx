import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import styles from './user-report-styles.scss';

const { USER_REPORT_KEY } = process.env;

class UserReport extends PureComponent {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window._urq = window._urq || [];
      window._urq.push(['initSite', `${USER_REPORT_KEY}`]);
    }
  }

  onClick = () => {
    if (typeof window !== 'undefined') window._urq.push(['Feedback_Open']);
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <script
            type="text/javascript"
            async
            src={
              document.location.protocol === 'https:' ? (
                'https://cdn.userreport.com/userreport.js'
              ) : (
                'http://cdn.userreport.com/userreport.js'
              )
            }
          />
        </Helmet>
        <button className={styles.userReport} onClick={this.onClick}>
          Feedback
        </button>
      </React.Fragment>
    );
  }
}

export default UserReport;
