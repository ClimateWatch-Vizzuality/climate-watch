import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/my-climate-watch/my-cw-card';

import styles from './my-insights-styles.scss';

const MyInsights = ({ insights }) => (
  <div>
    <ul className={styles.insightsContainer}>
      {insights.map(insight => (
        <li key={insight.id} className={styles.insightsCard}>
          <Card
            data={insight}
            link={`/my-climate-watch/editor/${insight.id}`}
          />
        </li>
      ))}
    </ul>
  </div>
);

MyInsights.propTypes = {
  insights: PropTypes.array
};

export default MyInsights;
