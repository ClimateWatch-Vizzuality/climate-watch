import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout';
import Loading from 'components/loading';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';
import styles from './compare-socioeconomics-styles.scss';

class CompareSocioeconomics extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const renderSocioeconomics = (data, index) => <div key={index}>Hello</div>;
    const { countrySocioeconomics, locations, loading } = this.props;
    return (
      <div className={layout.content}>
        <SocioeconomicsProvider locations={locations} />
        {loading ? (
          <Loading light className={styles.loader} />
        ) : (
          <div className="grid-column-item">
            <div className={styles.col3}>
              {countrySocioeconomics &&
                [0, 1, 2].map(i =>
                  renderSocioeconomics(
                    countrySocioeconomics.find(c => c.index === i),
                    i
                  )
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CompareSocioeconomics.propTypes = {
  countrySocioeconomics: PropTypes.array,
  locations: PropTypes.array,
  loading: PropTypes.bool
};

export default CompareSocioeconomics;
