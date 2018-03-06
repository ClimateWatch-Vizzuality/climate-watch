import React from 'react';
import PropTypes from 'prop-types';
import ActionCard from 'components/my-climate-watch/my-cw-placeholder-card';
import Loading from 'components/loading';
import layoutStyles from 'app/styles/layout';

import Card from './my-cw-insight-card';
import styles from './my-insights-styles.scss';

const MyInsights = ({ loaded, insights, insight, deleteInsight }) => {
  if (!loaded) {
    return <Loading className={styles.loading} />;
  }
  return (
    <div>
      {insight.deleting && (
        <div className={layoutStyles.loadingModal}>
          <Loading />
        </div>
      )}
      <ul className={styles.insightsContainer}>
        {insights.map(item => (
          <li key={item.id} className={styles.insightsCard}>
            <Card
              data={item}
              link={`/my-climate-watch/editor/${item.id}`}
              deleteInsight={deleteInsight}
            />
          </li>
        ))}
        <li key="action-card" className={styles.insightsCard}>
          <ActionCard
            text="Create a new insight"
            action={{ type: 'link', to: '/my-climate-watch/editor' }}
          />
        </li>
      </ul>
    </div>
  );
};

MyInsights.propTypes = {
  loaded: PropTypes.bool.isRequired,
  insights: PropTypes.array,
  insight: PropTypes.object,
  deleteInsight: PropTypes.func
};

export default MyInsights;
