import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/my-climate-watch/my-cw-card';
import Button from 'components/button';
import Loading from 'components/loading';

import styles from './my-insights-styles.scss';

const MyInsights = ({ loaded, insights }) => {
  if (!loaded) {
    return <Loading className={styles.loading} />;
  }
  if (!insights || !insights.length > 0) {
    return (
      <div className={styles.placeholder}>
        <p>There isn&apos;t any insight still</p>
        <Button
          className={styles.createBtn}
          color="yellow"
          href="/my-climate-watch/editor"
        >
          Create your first insight
        </Button>
      </div>
    );
  }
  return (
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
};

MyInsights.propTypes = {
  loaded: PropTypes.bool.isRequired,
  insights: PropTypes.array
};

export default MyInsights;
