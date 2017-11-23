import React, { PureComponent } from 'react';
import Button from 'components/button';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Loading from 'components/loading';

import layout from 'styles/layout.scss';
import cx from 'classnames';
import styles from './emission-pathways-overview-styles.scss';

class EmissionPathwaysOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { data, loading } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          {loading && <Loading light className={styles.loader} />}
          <div className={cx(styles.col5, styles.overview)}>
            {data &&
              Object.keys(data).map(key => (
                <div key={key} className={styles.item}>
                  <div className={styles.title}>{startCase(key)}</div>
                  <div className={styles.itemData}>{data[key]}</div>
                </div>
              ))}
          </div>
          <div className={styles.col5}>
            <Button className={(styles.col5, styles.seeAllButton)}>
              See all
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

EmissionPathwaysOverview.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool
};

export default EmissionPathwaysOverview;
