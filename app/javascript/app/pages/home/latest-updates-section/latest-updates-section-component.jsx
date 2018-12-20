import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from 'components/tile';
import LatestUpdatesProvider from 'providers/latest-updates-provider';
import { Loading } from 'cw-components';
import NoContent from 'components/no-content';
import styles from './latest-updates-section-styles.scss';

class LatestUpdatesSection extends Component {
  renderContent = data =>
    (data && data.length > 0 ? (
      data.map(({ category, date, description, link }, i) => (
        <Tile
          key={`tile-${i + 1}`}
          category={category}
          date={date}
          description={description}
          link={link}
        />
      ))
    ) : (
      <NoContent message="No latest updates" className={styles.noContent} />
    ));

  render() {
    const { latestUpdates: { data, loading } } = this.props;
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Latest updates</h2>
          <div className={styles.tilesGroup}>
            {loading ? (
              <div className={styles.noContent}>
                <Loading />
              </div>
            ) : (
              this.renderContent(data)
            )}
          </div>
        </div>
        <LatestUpdatesProvider />
      </section>
    );
  }
}

LatestUpdatesSection.propTypes = {
  latestUpdates: PropTypes.object
};

LatestUpdatesSection.defaultProps = {
  latestUpdates: {
    loading: false,
    data: []
  }
};

export default LatestUpdatesSection;
